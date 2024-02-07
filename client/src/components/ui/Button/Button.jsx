import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = (props) => {
  return (
    <>
      <NavLink to='/catalog' className='button'>{props.title}</NavLink>
    </>
  ) 
}

export default Button;