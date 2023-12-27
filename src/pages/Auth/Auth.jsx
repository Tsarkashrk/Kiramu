import React from 'react';

const Auth = () => {
  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <div className="auth__email">
        <input type="text" placeholder="Email" />
      </div>
      <div className="auth__username">
        <input type="text" placeholder="Username" />
      </div>
      <div className="auth__password">
        <input type="text" placeholder="Password" />
      </div>
    </div>
  );
};

export default Auth;
