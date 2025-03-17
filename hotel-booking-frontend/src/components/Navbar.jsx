import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { logout, session } from "../app/store/slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { protectedRoutes } from "../app/services/permissions.js";

const Navbar = () => {
  const { isLoggedIn, user } = useSelector(session);
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();

  const handleNav = () => {
    setNav(!nav);
  };

  const navbarItems =
    user?.roles?.flatMap((role) => protectedRoutes[role]) || [];
  // console.log(user);
  const navItems = [
    { name: "home", active: true, url: "/" },
    {
      name: "manage booking",
      active: isLoggedIn,
      url: `/bookings/my-bookings`,
    },
    { name: "login", active: !isLoggedIn, url: "/login" },
    { name: "signup", active: !isLoggedIn, url: "/register" },
  ];

  return (
    <div className="bg-blue-500 flex justify-between items-center h-20 w-full px-4 text-white">
      <h1 className="w-full text-3xl font-bold">
        {" "}
        <NavLink to={"/"}>LOGO</NavLink>{" "}
      </h1>

      <ul className="hidden md:flex justify-end items-center w-full">
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
            onClick={() => dispatch(logout())}
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
        {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </div>

      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full bg-blue-500 ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] z-50"
        }
      >
        <h1 className="w-full text-3xl font-bold m-4">
          <NavLink to={"/"}>LOGO</NavLink>
        </h1>

        {navItems.map((item) =>
          item.active ? (
            <li
              key={item.name}
              className="p-4 hover:bg-blue-600 duration-300 cursor-pointer"
            >
              <NavLink to={item.url} className={"w-full h-full capitalize"}>
                {item.name}
              </NavLink>
            </li>
          ) : null
        )}

        {isLoggedIn && (
          <li
            className={
              "p-4 hover:bg-blue-600 duration-300 cursor-pointer h-full capitalize flex items-center gap-1"
            }
            onClick={logout}
          >
            <span>logout</span>
            <IoIosLogOut size={16} />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
