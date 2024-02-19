import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { anilibriaApi } from '../../../constants/api';

const setActive = ({ isActive }) =>
  isActive ? 'button button--secondary--active' : 'button button--secondary';

const Navigation = () => {
  const [anime, setAnime] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(!!localStorage.getItem('token'));

  const fetchRandomAnime = async () => {
    const response = await fetch(`${anilibriaApi}title/random`);
    const data = await response.json();
    setAnime(data);
  };

  useEffect(() => {
    fetchRandomAnime();
  }, []);

  const handleRandomButtonClick = () => {
    fetchRandomAnime();
  };

  const handleLogOut = () => {
    setIsAuthorized(false);
    localStorage.removeItem('token');
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
      <NavLink className="button button--secondary--active" to="/auth/login">
        Войти
      </NavLink>
    </nav>
  );
};

export default Navigation;
