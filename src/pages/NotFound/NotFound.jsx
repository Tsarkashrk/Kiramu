import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className='not-found'>
      Упссс... Страница не найдена
      <Link className='button' to='/'>Перейти на главную страницу</Link>
    </main>
  );
};

export default NotFound;
