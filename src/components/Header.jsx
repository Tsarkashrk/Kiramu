import React from 'react';
import Search from './Search';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="header">
      <a className='header__logo' href="/">Kiramu</a>

      <Search />
      
      <Navigation />
    </header>
  )
}

export default Header;