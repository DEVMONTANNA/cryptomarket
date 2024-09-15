import React, { useState } from "react";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="flex items-center justify-between h-16 px-4 bg-gray-900 text-white sticky top-0 z-50">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-10" />
          <span className="ml-2 text-lg font-bold">Crypto Market</span>
        </div>

        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col list-none md:flex md:flex-row md:items-center absolute md:relative top-16 md:top-auto right-0 md:right-auto w-full md:w-auto bg-gray-800 md:bg-transparent text-center md:text-left z-10 md:z-auto`}
        >
          <li className="py-2 md:py-0 md:px-4 cursor-pointer hover:text-purple-400">
            Home
          </li>
          <li className="py-2 md:py-0 md:px-4 cursor-pointer hover:text-purple-400">
            Features
          </li>
          <li className="py-2 md:py-0 md:px-4 cursor-pointer hover:text-purple-400">
            Pricing
          </li>
          <li className="py-2 md:py-0 md:px-4 cursor-pointer hover:text-purple-400">
            Blog
          </li>
        </nav>

        <div className="hidden md:flex items-center">
          <select className="border border-white bg-transparent text-white px-2 py-1 rounded-md focus:outline-none">
            <option className="text-black">USD</option>
            <option className="text-black">GBP</option>
            <option className="text-black">NGN</option>
          </select>
          <button className="ml-4 px-4 py-1 bg-white text-black rounded-md hover:bg-gray-300">
            Sign up
          </button>
        </div>

        <div
          className="md:hidden flex flex-col justify-between w-6 h-5 cursor-pointer"
          onClick={toggleMenu}
        >
          <span className="block h-0.5 w-full bg-white mb-1 transition-all"></span>
          <span className="block h-0.5 w-full bg-white mb-1 transition-all"></span>
          <span className="block h-0.5 w-full bg-white transition-all"></span>
        </div>
      </header>
      <hr />
    </>
  );
};

export default Header;
