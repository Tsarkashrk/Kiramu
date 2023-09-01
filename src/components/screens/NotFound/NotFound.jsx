import React from "react";
import { Link } from "react-router-dom";
import Home from "../Home/Home";

const NotFound = () => {
  return (
    <main className="not-found">
      СТРАНИЦА НЕ НАЙДЕНА
      <Link to="/">Главная</Link>
    </main>
  );
};

export default NotFound;
