import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in capitalise";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-black transition-all duration-200 ease-in capitalise";

const categories = [
  { name: "Animals" },
  { name: "Wallpapers" },
  { name: "Coding" },
  { name: "Games" },
  { name: "Nature" },
  { name: "Sports" },
  { name: "Wallpapers" },
];

const Sidebar = ({ user, closeToggle }) => {
  const handleclose = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar">
      <div className="flex flex-col ">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleclose}
        >
          <img
            src="http://photos.prnewswire.com/prnfull/20160712/389032LOGO?max=200"
            className="w-20"
            alt="logo"
          />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleclose}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleclose}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`/user-profile/${user._id}`}
          className="flex  my-5 mb-3 gap-2 p-2 items-center bg-gray-50 rounded-lg hover:shadow-lg mx-3"
          onClick={handleclose}
        >
          <img
            src={user.image}
            className=" w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.username}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
