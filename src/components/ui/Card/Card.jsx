import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ animeList }) => {
  const POSTER_URL = 'https://api.litelibria.com/posters/';

  return (
    <div className="card__container">
      {animeList.map((anime, i) => {
        return (
          <Link className="card" key={i} to={`/anime/${anime.code}`}>
            <img className="card__image" src={`${POSTER_URL}${anime.id}.webp`} alt="" />
            <div className="card__details">
              <div
                name="card__status"
                className={
                  anime.status.string === 'В работе'
                    ? 'card__status'
                    : 'card__status card__status--secondary'
                }>
                {anime.status.string
                  ? anime.status.string
                  : anime.player.episodes.last === anime.type.episodes
                  ? 'Завершен'
                  : 'В работе'}
              </div>
              <div className="card__text">
                <h2 className="card__title">{anime.names.ru}</h2>
                <div className="card__description">
                  <p className="card__year">{anime.season.year} </p>
                  <p className="card__series">
                    {anime.player.episodes.last} из {anime.type.episodes ? anime.type.episodes : '?'} эпизодов
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Card;
