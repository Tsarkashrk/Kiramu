import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = (props) => {
  return (
    <>
      <NavLink to='/list' className='button'>{props.title}</NavLink>
    </>
  ) 
}

export default Button;