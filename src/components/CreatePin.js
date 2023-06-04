import React from "react";
import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Sanityclient } from "../client";
import Spinner from "./Spinner";
import { categories } from "../util.js/data";

const CreatePin = () => {
  const [Title, setTitle] = useState("");
  const [About, setAbout] = useState("");
  const [destination, setdestination] = useState("");
  const [loading, setloading] = useState(false);
  const [fields, setfields] = useState(false);
  const [category, setcategory] = useState(null);
  const [imageAsset, setimageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full"></div></div>
    </div>
  );
};

export default CreatePin;
