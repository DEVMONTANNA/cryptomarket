import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="logoImage" />
          <span className="logoText">Cryptoplace</span>
        </div>

        <nav className={`navItems ${isMenuOpen ? "open" : ""}`}>
          <li className="navlink">Home</li>
          <li className="navlink">Features</li>
          <li className="navlink">Pricing</li>
          <li className="navlink">Blog</li>
        </nav>

        <div className="headerButtons">
          <select className="select">
            <option className="currencyOption">USD</option>
            <option className="currencyOption">GBP</option>
            <option className="currencyOption">NGN</option>
          </select>
          <button className="button">Sign up</button>
        </div>

        {/* Menu Toggle Button */}
        <div className="menuToggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </header>
      <hr className="headerStop" />
    </>
  );
};

export default Header;
