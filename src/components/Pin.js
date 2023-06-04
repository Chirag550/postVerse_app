import React from "react";
import { urlfor } from "../client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { Sanityclient } from "../client";
import { fetchUser } from "../util.js/fetchUser";

const Pin = ({ pin: { image, postedBy, _id, destination, save } }) => {
  const navigate = useNavigate();
  const [posthovered, setPostHovered] = useState(false);

  const user = fetchUser();

  const alreadySaved = !!save?.filter((item) => item.postedBy._id === user.sub)
    ?.length;
  console.log(_id);
  const savePin = (id) => {
    if (!alreadySaved) {
      Sanityclient.patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.sub,
            postedBy: {
              _type: "postedBy",
              _ref: user.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const DeletePin = (id) => {
    Sanityclient.delete(id).then(() => window.location.reload());
  };
  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="rounded-lg w-full"
          alt="user-post"
          src={urlfor(image).width(250).url()}
        />
        {posthovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-15"
            style={{ height: "100%" }}
          >
            <div className="flex  items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline fontSize={30} />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {save?.length}Saved
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full ">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-semibold p-1 pl-2 pr-2 rounded-full opacity-70  hover:opacity-100 hover:shadow-md "
                >
                  <BsFillArrowUpRightCircleFill fontSize={20} />
                  {destination.length > 20
                    ? destination.slice(8, 20)
                    : destination.slice(8)}
                </a>
              )}
              {postedBy?._id === user.sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    DeletePin(_id);
                  }}
                  className="bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${user?._id}`}
        className="flex gap-3 mt-2 items-center hover:shadow-lg"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user profile"
        />
        <p className="font-semibold capitalize">{postedBy?.username}</p>
      </Link>
    </div>
  );
};

export default Pin;
