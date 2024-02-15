import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:1000/auth/login', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      window.location.href = '/auth/me';
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="auth">
      <div className="auth__wrapper">
        <h1 className="auth__title">Вход</h1>
        <form onSubmit={handleSubmit} className="auth__form">
          <div className="auth__email">
            <input
              className="search__input auth__input"
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="auth__password">
            <input
              className="search__input auth__input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="auth__processess">
            <button className="button button--secondary--active auth__button" type="submit">
              Войти
            </button>
            <div className="auth__nav">
              Нет аккаунта?
              <Link className="auth__link" to="/auth/register">
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
