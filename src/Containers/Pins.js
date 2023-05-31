import React from "react";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Search from "../components/Search";
import NavBar from "../components/NavBar";

import PinDetails from "../components/PinDetails";
import Feed from "../components/Feed";
import CreatePin from "../components/CreatePin";
const Pins = ({ user }) => {
  const [searchterm, setSearchterm] = useState("");

  return (
    <>
      <div className="px-2 md:px-5">
        <div className="bg-gray-100">
          <NavBar
            searchterm={searchterm}
            setSearchterm={setSearchterm}
            user={user}
          />
        </div>
        <div className="h-full bg-gray-100">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryID" element={<Feed />} />
            <Route
              path="/pin-detail/:pinid"
              element={<PinDetails user={user} />}
            />
            <Route path="/create-pin" element={<CreatePin user={user} />} />
            <Route
              path="/search"
              element={
                <Search searchterm={searchterm} setSearchterm={setSearchterm} />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Pins;
