import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Filter from "../pages/Filter";

const Navigation = () => {
  return (
    <>
      <nav className="navigation">
        <Link className="navigation__link" to="/">Главная</Link>
        <Link className="navigation__link" to="/categories">Категории</Link>
        <Link className="navigation__link" to="/filter">Фильтр</Link>
      </nav>
    </>
  )
}

export default Navigation;