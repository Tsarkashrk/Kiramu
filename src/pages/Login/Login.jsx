import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');

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
      navigate('/profile');
    } catch (error) {
      setError(error.response.data);
      console.error(error.response.data);
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
          {error && (
            <div className="auth__error">
              {Array.isArray(error) ? (
                error.map((error, index) => (
                  <p key={index} className="auth__message">
                    * {error.msg}
                  </p>
                ))
              ) : (
                <p className="auth__message">* {error.message}</p>
              )}
            </div>
          )}
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
