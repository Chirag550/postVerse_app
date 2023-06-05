import React from "react";
import { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Sanityclient, urlfor } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { pindetailQuery, pinDetailMorePinQuery } from "../util.js/data";
import { AiTwotoneDelete } from "react-icons/ai";

const PinDetails = ({ user }) => {
  const [pins, setpins] = useState(null);
  const [pindetail, setpindetail] = useState(null);
  const [comment, setcomment] = useState("");
  const [addingComment, setaddingComment] = useState(false);
  const { pinid } = useParams();

  const fetchPinDetails = () => {
    let query = pindetailQuery(pinid);
    if (query) {
      Sanityclient.fetch(query).then((data) => {
        setpindetail(data[0]);
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);

          Sanityclient.fetch(query).then((data) => setpins(data));
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinid]);

  const addComment = () => {
    if (comment) {
      setaddingComment(true);

      Sanityclient.patch(pinid)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: "postedBy", _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setcomment("");
          setaddingComment(false);
        });
    }
  };

  const DeletePin = (key) => {
    Sanityclient.patch(pinid)
      .unset([`comments[_key=="${key}"]`])
      .commit()
      .then(() => window.location.reload());
  };
  console.log(pindetail);
  if (!pindetail) return <Spinner message="Loading post details" />;
  return (
    <>
      <div
        className="flex xl-flex-row flex-col m-auto bg-white "
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial ">
          <img
            src={pindetail?.image && urlfor(pindetail.image).url()}
            className="rounded-t-3xl rounded-b-lg"
            alt="user-post"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pindetail?.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline fontSize={30} />
              </a>
            </div>
            <a
              href={pindetail.destination}
              target="_blank"
              rel="noreferrer"
              className="bg-white flex items-center gap-2 text-black font-semibold p-1 pl-2 pr-2 rounded-full opacity-70  hover:opacity-100 hover:shadow-md "
            >
              <BsFillArrowUpRightCircleFill fontSize={20} />
              {pindetail.destination.length > 20
                ? pindetail.destination.slice(8, 20)
                : pindetail.destination.slice(8)}
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pindetail.title}
            </h1>
            <p className="mt-3">{pindetail.about}</p>
          </div>
          <Link
            to={`user-profile/${user?.sub}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg hover:shadow-lg"
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={pindetail.postedBy?.image}
              alt="user profile"
            />
            <p className="font-semibold capitalize">
              {pindetail.postedBy?.username}
            </p>
          </Link>
          <h2 className="mt-2 text-2xl">Comments</h2>
          {pindetail?.comments?.map((comment) => (
            <div
              className="flex items-center justify-between"
              key={comment.comment}
            >
              <div className="flex gap-2 mt-5 items-center justify-between bg-white rounded-lg">
                <img
                  src={comment.postedBy?.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{comment.postedBy?.username}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
              {pindetail.postedBy?._id === user._id && (
                <div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      DeletePin(comment._key);
                    }}
                    className="bg-white flex  p-2 opacity-70 hover:opacity-100 text-dark font-bold px-3 py-1 text-base rounded-2xl hover:shadow-md outline-none hover:bg-black hover:text-white "
                  >
                    <AiTwotoneDelete />
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/${user._id}`}>
              <img
                src={user?.image}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="user-profile"
              />
            </Link>
            <input
              className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? "Doing..." : "Done"}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2x mt-8 mb-4 ">
            More Like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner message="Loading more posts" />
      )}
    </>
  );
};

export default PinDetails;
