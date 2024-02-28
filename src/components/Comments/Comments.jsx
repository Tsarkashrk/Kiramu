import React from 'react';

import Heading from '../Heading/Heading';

const Comments = ({ animeId }) => {
  const isAuth = localStorage.getItem('token');

  return (
    <div className="comments">
      <div className="comments__heading">
        <Heading title="КОММЕНТАРИИ" />
      </div>

      {isAuth ? (
        <div className="comments__add">
          <input className="search__input" placeholder="Напишите комментарий" />
          <ion-icon name="arrow-forward-circle"></ion-icon>
        </div>
      ) : (
        <div className="comments__attention">
          <ion-icon name="alert-circle"></ion-icon>
          <p className="comments__warning">
            Зарегистрируйтесь или войдите, чтобы оставить комментарий
          </p>
        </div>
      )}
    </div>
  );
};

export default Comments;
