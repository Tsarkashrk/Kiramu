import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";  

const setActive = ({isActive}) => isActive ? "navigation__link--active" : "navigation__link";

const Navigation = () => {
  return (
    <>
      <nav className="navigation">
        <NavLink className={setActive} to="/" >Главная</NavLink>
        <NavLink className={setActive} to="/categories">Категории</NavLink>
        <NavLink className={setActive} to="/filter">Фильтр</NavLink>
      </nav>
    </>
  )
}

export default Navigation;