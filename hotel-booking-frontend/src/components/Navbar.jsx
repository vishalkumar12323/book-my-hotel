import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { logout, session } from "../app/store/slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { protectedRoutes } from "../app/services/permissions.js";
import { config } from "../config/index.js";

const Navbar = () => {
  const { isLoggedIn, user, accessToken } = useSelector(session);
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const navbarItems = [
    ...new Set(user?.roles?.flatMap((role) => protectedRoutes[role]) || []),
  ];

  const logoutUser = async () => {
    const response = await fetch(`${config.api_base_url}_auth/logout`, {
      credentials: "include",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });
    if (response.ok) {
      console.log(await response.json());
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="bg-blue-500 flex justify-between items-center h-16 md:h-20 w-full px-4">
      <h1 className="w-full text-xl md:text-3xl font-bold">
        {" "}
        <NavLink to={"/"}>
          <h1 className="uppercase w-fit text-xl md:text-2xl font-[900] text-[20px] bg-[conic-gradient(var(--tw-gradient-stops))] from-[#f3f8ff] via-[#deecff] to-[#c6cfff]">
            bookmyhotel
          </h1>
        </NavLink>{" "}
      </h1>

      <ul className="hidden md:flex justify-end items-center w-full text-white">
        {navbarItems?.map((route) => {
          return (
            <li
              key={route}
              className={
                "p-4 hover:bg-blue-600 duration-300 cursor-pointer h-full capitalize flex items-center gap-1"
              }
            >
              <Link to={route}>
                {route === "/"
                  ? "home"
                  : route?.replace("/", "").replace("-", " ")}
              </Link>
            </li>
          );
        })}

        {isLoggedIn ? (
          <li
            className={
              "p-4 hover:bg-blue-600 duration-300 cursor-pointer h-full capitalize flex items-center gap-1"
            }
            onClick={logoutUser}
          >
            <span>logout</span>
            <IoIosLogOut size={16} />
          </li>
        ) : (
          <>
            <li
              className={
                "p-4 hover:bg-blue-600 duration-300 cursor-pointer h-full capitalize flex items-center gap-1"
              }
            >
              <Link to={"/login"}>login</Link>
            </li>
            <li
              className={
                "p-4 hover:bg-blue-600 duration-300 cursor-pointer h-full capitalize flex items-center gap-1"
              }
            >
              <Link to={"/register"}>register</Link>
            </li>
          </>
        )}
      </ul>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose size={24} className="text-white" />
        ) : (
          <AiOutlineMenu size={24} className="text-white" />
        )}
      </div>

      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full text-white bg-blue-500 ease-in-out duration-500 z-50"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        <h1 className="w-full text-xl font-bold m-4">
          <NavLink to={"/"}>LOGO</NavLink>
        </h1>

        {navbarItems?.map((route) => {
          return (
            <li
              key={route}
              className={
                "p-4 hover:bg-blue-600 duration-300  cursor-pointer capitalize flex items-center gap-1"
              }
            >
              <Link to={route}>
                {route === "/"
                  ? "home"
                  : route?.replace("/", "").replace("-", " ")}
              </Link>
            </li>
          );
        })}

        {isLoggedIn ? (
          <li
            className={
              "p-4 hover:bg-blue-600 duration-300 cursor-pointer capitalize flex items-center gap-1"
            }
            onClick={logoutUser}
          >
            <span>logout</span>
            <IoIosLogOut size={16} />
          </li>
        ) : (
          <>
            <li
              className={
                "p-4 hover:bg-blue-600 duration-300 cursor-pointer capitalize flex items-center gap-1"
              }
            >
              <Link to={"/login"}>login</Link>
            </li>
            <li
              className={
                "p-4 hover:bg-blue-600 duration-300 cursor-pointer capitalize flex items-center gap-1"
              }
            >
              <Link to={"/register"}>register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
