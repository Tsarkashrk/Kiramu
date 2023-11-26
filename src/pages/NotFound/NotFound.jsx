import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({title} = 'Упссс... Страница не найдена') => {
  return (
    <main className='not-found'>
      {title}
      <Link className='button' to='/'>Перейти на главную страницу</Link>
    </main>
  );
};

export default NotFound;
