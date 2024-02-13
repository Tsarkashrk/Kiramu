import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:1000/auth/register', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="auth">
      <div className="auth__wrapper">
        <h1 className="auth__title">Регистрация</h1>
        <form onSubmit={handleSubmit} className="auth__form">
          <div className="auth__username">
            <input
              className="search__input auth__input"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
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
              Зарегистрироваться
            </button>
            <div className="auth__nav">
              Есть аккаунт?
              <Link className="auth__link" to="/auth/login">
                Войти
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
