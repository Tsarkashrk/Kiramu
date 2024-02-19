import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = (props) => {
  return (
    <>
      <NavLink
        to={props.navigation}
        className={`button ${props.additionalClassName ? props.additionalClassName : ''}`}>
        {props.title}
      </NavLink>
    </>
  );
};

export default Button;
