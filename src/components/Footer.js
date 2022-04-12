import React from "react";
import logo from "images/logo.png";
import { FiMail } from "react-icons/fi";
import { ExternalLink } from "./NavLinks";
import { GoMarkGithub } from "react-icons/go";

export const Footer = () => {
  return (
    <footer className="flex flex-col px-6 text-white bg-ransparent md:justify-between lg:flex-row rouned-t-3xl">
      <a href="https://smswithoutborders.com" className="flex items-center p-4">
        <img src={logo} alt="logo" className="mr-3 w-7 h-7" />
        <p className="text-[0.95rem] md:text-base">
          <span className="font-bold">SMSWithoutBorders</span>
        </p>
      </a>
      <ExternalLink href="mailto:developers@smswithoutborders.com">
        <FiMail size={20} />
        <span className="ml-2">developers@smswithoutborders.com</span>
      </ExternalLink>
      <ExternalLink
        key="github"
        href="https://github.com/smswithoutborders"
        target="_blank"
      >
        <GoMarkGithub size={20} />
        <span className="ml-2">smswithoutborders</span>
      </ExternalLink>
    </footer>
  );
};
