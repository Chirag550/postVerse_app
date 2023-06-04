import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
const NavBar = ({ searchterm, setSearchterm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;
  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-md">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          placeholder="Search"
          value={searchterm}
          onFocus={() => navigate("/search")}
          onChange={(e) => {
            setSearchterm(e.target.value);
          }}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link to={`/user-profile/${user?._id}`} className="hidden md:block">
          <img src={user.image} alt={user} className="w-14 rounded-lg h-12" />
        </Link>
        <Link
          to={"/create-pin"}
          className=" flex justify-center items-center  bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12"
        >
          <IoMdAdd fontSize={21} />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
