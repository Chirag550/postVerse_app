import React from "react";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Sanityclient } from "../client";
import Spinner from "./Spinner";
import { categories } from "../util.js/data";

const CreatePin = ({ user }) => {
  const [Title, setTitle] = useState("");
  const [About, setAbout] = useState("");
  const [destination, setdestination] = useState("");
  const [loading, setloading] = useState(false);
  const [fields, setfields] = useState(false);
  const [category, setcategory] = useState(null);
  const [imageAsset, setimageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();
  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpg" ||
      type === "image/gif" ||
      type === "image/jpeg"
    ) {
      setWrongImageType(false);
      setloading(true);
      Sanityclient.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setimageAsset(document);
          setloading(false);
        })
        .catch((err) => console.log("Image Upload Error", err));
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = (e) => {
    if (Title && About && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title: Title,
        about: About,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };
      Sanityclient.create(doc).then(() => navigate("/"));
    } else {
      setfields(true);
      setTimeout(() => {
        setfields(false);
      }, 2000);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 bg-gray-50">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-gray-200 p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center border-2 border-dotted flex-col border-gray-500 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong Image Type</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col items-center cursor-pointer">
                    <p className="font-bold text-2xl ">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to Upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    use high quality JPG ,SVG ,PNG less than 20 mb
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image "
                  onChange={uploadImage}
                  className="w=0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 p-3 right-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setimageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex  flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add Your Title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-gray-100 rounded-lg ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full "
                alt="user-profile"
              />
              <p className="font-bold">{user.username}</p>
            </div>
          )}
          <input
            type="text"
            value={About}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your post about"
            className="outline-none text-base sm:text-lg  border-b-2 border-gray-200 p-2"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setdestination(e.target.value)}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg  border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl">
                Choose Post Category
              </p>
              <select
                onChange={(e) => setcategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black"
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5 ">
              {" "}
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                SavePin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
