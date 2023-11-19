import React from 'react';
import { NavLink } from 'react-router-dom';  

const setActive = ({isActive}) => isActive ? 'button button--secondary--active' : 'button button--secondary';

const Navigation = () => {
  return (
      <nav className='navigation'>
        <NavLink className={setActive} to='/'>Главная</NavLink>
        <NavLink className={setActive} to='/catalog'>Каталог</NavLink>
        <NavLink className={setActive} to='/anime'>Рандом</NavLink>
      </nav>
  )
}

export default Navigation;