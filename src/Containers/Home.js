import React from "react";

import { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile";
import { Sanityclient } from "../client";
import Pins from "./Pins";
import { userQuery } from "../util.js/data";
import { fetchUser } from "../util.js/fetchUser";

const Home = () => {
  const [toggleSideBar, settoggleSideBar] = useState(false);

  const [user, setuser] = useState(null);

  const scrollRef = useRef(null);

  const userinfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userinfo?.sub);
    Sanityclient.fetch(query).then((data) => {
      setuser(data[0]);
      console.log("user", data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      {/* "for desktop slidebar" */}
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>

      {/* for mobile screen */}
      <div className="flex md:hidden flex-row ">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-lg">
          <HiMenu
            fontSize={40}
            onClick={() => {
              settoggleSideBar(true);
            }}
          />
          <Link to="/">
            <img
              src="http://photos.prnewswire.com/prnfull/20160712/389032LOGO?max=200"
              className="w-28"
              alt="Verse"
            ></img>
          </Link>
          <Link to={`/user-profile/${user?._id}`}>
            <img src={user?.image} className="w-10" alt="Verse"></img>
          </Link>
        </div>

        {/* {sidebar panel} */}
        {toggleSideBar && (
          <div className="fixed w-3/5 bg-gray-500 h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2 ">
              <AiFillCloseCircle
                onClick={() => {
                  settoggleSideBar(false);
                }}
              />
            </div>
            <Sidebar user={user && user} closeToggle={settoggleSideBar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route
            path="*user-profile*:userId"
            element={<UserProfile user={user && user} />}
          />
          <Route path="*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
