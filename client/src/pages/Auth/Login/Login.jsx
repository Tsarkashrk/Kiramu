import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="auth">
      <div className="auth__wrapper">
        <form action="" className="auth__form">
          <h1 className="auth__title">Войти</h1>
          <div className="auth__email">
            <input className="search__input auth__input" type="text" placeholder="Email" />
          </div>
          <div className="auth__password">
            <input className="search__input auth__input" type="text" placeholder="Password" />
          </div>
          <Link to="/auth/register">Нет аккаунта?</Link>
        </form>
        <button></button>
      </div>
    </div>
  );
};

export default Login;
