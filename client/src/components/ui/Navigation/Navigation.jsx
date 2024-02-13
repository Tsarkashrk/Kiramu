import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const setActive = ({ isActive }) =>
  isActive ? 'button button--secondary--active' : 'button button--secondary';

const Navigation = () => {
  let isAuth = false;

  const API_URL = 'https://api.anilibria.tv/v3/';

  const [anime, setAnime] = useState({});

  const fetchRandomAnime = async () => {
    const response = await fetch(`${API_URL}title/random`);
    const data = await response.json();
    setAnime(data);
  };

  useEffect(() => {
    fetchRandomAnime();
  }, []);

  const handleRandomButtonClick = () => {
    fetchRandomAnime();
  };

  return (
    <nav className="navigation">
      <NavLink className={setActive} to="/">
        Главная
      </NavLink>
      <NavLink className={setActive} to="/catalog">
        Каталог
      </NavLink>
      <NavLink
        className="button button--secondary"
        onClick={handleRandomButtonClick}
        to={`/anime/${anime.code}`}>
        Рандом
      </NavLink>
      {!isAuth ? (
        <NavLink
          className="button button--secondary--active"
          to="/auth/login"
          onClick={handleRandomButtonClick}>
          Войти
        </NavLink>
      ) : (
        ''
      )}
    </nav>
  );
};

export default Navigation;
