import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen p-0 m-0 bg-gradient-to-br from-black via-slate-800 to-black">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
