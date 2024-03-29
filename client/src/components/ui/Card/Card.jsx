import React from 'react';
import { Link } from 'react-router-dom';

import { anilibriaUrl } from '../../../constants/api';

const Card = ({ animes }) => {
  return (
    <>
      {animes.map((anime, i) => {
        return (
          <Link className="card" key={i} to={`/anime/${anime.code}`}>
            <img
              className="card__image"
              src={`${anilibriaUrl}/${anime.posters.medium.url}`}
              alt="poster"
            />
            <div className="card__details">
              <div
                name="card__status"
                className={
                  anime.player.episodes.last !== anime.type.episodes
                    ? 'card__status'
                    : 'card__status card__status--secondary'
                }>
                {anime.type.string === 'MOVIE'
                  ? 'Завершен'
                  : anime.player.episodes.last === anime.type.episodes
                  ? 'Завершен'
                  : 'Онгоинг'}
              </div>
              <div className="card__text">
                <h2 className="card__title">{anime.names.ru}</h2>
                <div className="card__description">
                  <p className="card__year">{anime.season.year} </p>
                  <p className="card__series">
                    {anime.player.episodes.last} из {''}
                    {anime.type.string === 'MOVIE'
                      ? 1
                      : anime.type.episodes
                      ? anime.type.episodes
                      : '?'}{' '}
                    эпизодов
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default Card;
