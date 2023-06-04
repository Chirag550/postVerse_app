import React from "react";
import { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Sanityclient, urlfor } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const PinDetails = ({ user }) => {
  const [pins, setpins] = useState(null);
  const [pindetails, setpindetails] = useState(null);
  const [comments, setcommments] = useState("");
  const [addingComment, setaddingComment] = useState(false);

  return <div>PinDetailss</div>;
};

export default PinDetails;
