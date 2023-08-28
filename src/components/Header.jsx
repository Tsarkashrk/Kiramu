import React from 'react';
import Search from './Search';

const Header = () => {
  return (
    <>
      <header className="header">
        <a className='header__logo' href="">Kiramu</a>

        <Search />

        <nav className="header__nav">
          <button className="header__button">Главная</button>
          <button className="header__button">Категории</button>
          <button className="header__button">Случайное</button>
        </nav>
      </header>
    </>
  )
}

export default Header;