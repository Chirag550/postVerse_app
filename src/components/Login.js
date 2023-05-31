import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import sharevideo from "../assests/share.mp4";
import jwtDecode from "jwt-decode";
import { stringify } from "uuid";
import Client from "../client";
const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    const decode = jwtDecode(response.credential);
    console.log(decode);
    localStorage.setItem("user", JSON.stringify(decode));
    const { name, picture, sub } = decode;

    const doc = {
      _id: sub,
      _type: "user",
      username: name,
      image: picture,
    };

    Client.createOrReplace(doc).then(() => {
      navigate("/", { replace: true });
    });

    console.log(response);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="absolute w-full h-full">
        <video
          src={sharevideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <img
              src="http://photos.prnewswire.com/prnfull/20160712/389032LOGO?max=200"
              width="100px"
            ></img>
          </div>
          <div className="shadow-2xl">
            <GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
