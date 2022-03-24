import React, { forwardRef } from "react";
import { NavLink as BaseNavLink } from "react-router-dom";
import clsx from "clsx";

export const NavLink = forwardRef(({ className, ...props }, ref) => {
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        clsx(
          "flex items-center px-4 py-6 lg:py-4 font-medium outline-none appearance-none text-gray-100",
          isActive && "border-b border-gray-100",
          className
        )
      }
    />
  );
});
