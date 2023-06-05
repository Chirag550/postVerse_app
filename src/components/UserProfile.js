import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { userCreatedPinsQuery, userCreatedSavePins } from "./util/data";
import MasonryLayout from "./MasonryLayout";
import { Sanityclient } from "../client";
import Spinner from "./Spinner";

const UserProfile = () => {
  const [user, setuser] = useState(null);
  const [pins, setpins] = useState(null);
  const [text, settext] = useState("Created");
  const [activebtn, setactivebtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();
  return <div>UserProfile</div>;
};

export default UserProfile;
