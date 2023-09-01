import React from "react";
import Search from "../../ui/Search/Search";
import Navigation from "../../ui/Navigation/Navigation";

const Header = () => {
  return (
    <header className="header">
      <a className="header__logo" href="/">
        Kiramu
      </a>

      <Search />

      <Navigation />
    </header>
  );
};

export default Header;
