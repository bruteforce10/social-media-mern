import React, { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { BsChatDots, BsQuestionCircle } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "state";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import { RiMenu3Fill } from "react-icons/ri";
import { setMode } from "state";

function Navbar() {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.mode);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isMenu, setIsMenu] = React.useState(false);
  const fullname = user ? `${user.firstName} ${user.lastName}` : "no name";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="bg-white dark:bg-black transition-all w-full py-4">
      <div className="max-w-[1240px] max-sm:px-4 px-8 mx-auto flex justify-between items-center">
        <div className="flex gap-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <img
              src={"/assets/logo-twitter.png"}
              alt="logo-twitter"
              className="w-[50px] "
            />
            <h3 className="text-2xl font-bold text-secondary dark:text-white">
              Twitter
            </h3>
          </div>
          <div className="hidden sm:grid sm:relative">
            <input
              type="text"
              id="search"
              placeholder="search"
              className="py-2 px-6 w-64 bg-dimWhite dark:bg-slate-800 dark:text-white rounded-md  focus:outline-none"
            />
            <a
              href="#search"
              className="text-3xl text-primary absolute place-self-center  right-3"
            >
              <IoIosSearch />
            </a>
          </div>
        </div>

        <div className="sm:hidden">
          <RiMenu3Fill
            className="text-3xl cursor-pointer"
            onClick={() => setIsMenu(!isMenu)}
          />
        </div>

        <ul
          className={`sm:flex max-sm:absolute max-sm:right-0 max-sm:bg-white max-sm:p-6 max-sm:mt-[300px] max-sm:space-y-4 max-sm:rounded-md gap-4 ${clsx(
            { hidden: !isMenu }
          )}`}
        >
          <li
            className="cursor-pointer  hover:scale-110 transition-all"
            onClick={() => dispatch(setMode())}
          >
            {theme === "dark" ? (
              <MdOutlineLightMode className="text-2xl text-primary " />
            ) : (
              <MdOutlineDarkMode className="text-2xl text-secondary " />
            )}
          </li>
          <li>
            <BsChatDots className="text-2xl text-secondary dark:text-primary" />
          </li>
          <li>
            <IoNotificationsOutline className="text-2xl text-secondary dark:text-primary" />
          </li>
          <li>
            <BsQuestionCircle className="text-2xl text-secondary dark:text-primary" />
          </li>
          <li className="cursor-pointer relative ">
            <div
              className="inline-flex items-center gap-2 dark:text-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{fullname}</span>
              <IoIosArrowDown />
            </div>
            <button
              className={`bg-secondary dark:bg-slate-800 text-white px-4 py-2 rounded-md absolute left-0 top-8 ${clsx(
                {
                  hidden: !isDropdownOpen,
                }
              )}`}
              onClick={() => dispatch(setLogout())}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
