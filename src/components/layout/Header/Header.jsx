import React from "react";
import { Link } from "react-router-dom";

import Search from "../../ui/Search/Search";
import Navigation from "../../ui/Navigation/Navigation";

const Header = () => {
  return (
    <header className="header">
      <Link className="header__logo" to="/">
        Kiramu
      </Link>

      <Search />

      <Navigation />
    </header>
  );
};

export default Header;
