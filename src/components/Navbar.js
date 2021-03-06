import React, { useState, useEffect, useCallback } from "react";
import logo from "images/logo.png";
import clsx from "clsx";
import { FiExternalLink, FiGrid, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { NavLink } from "./NavLinks";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  function toggleMenu() {
    setOpen(!open);
  }

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 80) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const SharedLinks = () => (
    <div className="xl:flex">
      <NavLink onClick={() => toggleMenu()} key="/" to="/">
        <FiGrid size={20} />
        <span className="ml-2">Table view</span>
      </NavLink>
      <a
        className="flex items-center p-5 font-medium text-gray-100 outline-none appearance-none "
        onClick={() => toggleMenu()}
        key="Github"
        href="https://github.com/orgs/smswithoutborders/"
        target="_blank"
        rel="noreferrer"
      >
        <FiExternalLink size={20} />
        <span className="ml-2">GitHub</span>
      </a>
    </div>
  );

  const Logo = () => (
    <Link to="/" className="flex items-center xl:ml-4">
      <img src={logo} alt="logo" className="mr-3 w-7 h-7" />
      <p className="text-gray-100">
        <span className="font-bold">SMSWithoutBorders</span> |
        <span className="font-normal"> Visor</span>
      </p>
    </Link>
  );

  return (
    <div
      className={clsx(
        "sticky top-0 z-50 h-16  shadow-3xl text-gray-100 ",
        toggle
          ? "bg-gradient-to-tl md:bg-gradient-to-r from-black via-slate-800 to-slate-800"
          : "bg-transparent"
      )}
    >
      <nav className="items-center justify-between hidden xl:flex">
        <Logo />
        <SharedLinks />
      </nav>
      <div className="xl:hidden">
        <div className="flex items-center justify-between p-4">
          <Logo />
          <button className="appearance-none" onClick={() => toggleMenu()}>
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {open && (
          <Transition
            show={open}
            appear={true}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="flex flex-col w-full h-screen bg-gradient-to-b from-black via-slate-800"
          >
            <SharedLinks />
          </Transition>
        )}
      </div>
    </div>
  );
};
