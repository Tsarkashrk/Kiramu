import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { anilibriaApi } from '../../../constants/api';

const setActive = ({ isActive }) =>
  isActive ? 'button button--secondary--active' : 'button button--secondary';

const Navigation = () => {
  const [anime, setAnime] = useState({});
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token'));

  const fetchRandomAnime = async () => {
    const response = await fetch(`${anilibriaApi}title/random`);
    const data = await response.json();
    setAnime(data);
  };

  useEffect(() => {
    fetchRandomAnime();
  }, []);

  const handleRandomAnime = () => {
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
        onClick={handleRandomAnime}
        to={`/anime/${anime.code}`}>
        Рандом
      </NavLink>
      {!isAuth ? (
        <NavLink className="button button--secondary--active" to="/auth/login">
          Войти
        </NavLink>
      ) : (
        <NavLink to="/profile">
          <img
            className="navigation__profile"
            src="/images/msg853484107-62724.jpg"
            alt="profile-image"
          />
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
