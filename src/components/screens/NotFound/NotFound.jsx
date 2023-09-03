import React from "react";
import { Link } from "react-router-dom";
import Home from "../Home/Home";

const NotFound = () => {
  return (
    <main className="not-found">
      Упссс... Страница не найдена
      <Link to="/" className="button">Главная</Link>
    </main>
  );
};

export default NotFound;
