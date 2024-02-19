import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { anilibriaApi, litelibriaPostersApi } from '../../constants/api.js';

import Iframe from '../../components/ui/Iframe/Iframe';
import Preloader from '../../components/ui/Preloader/Preloader';

const Anime = () => {
  const [anime, setAnime] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchAnimeByCode = async (code) => {
      try {
        const response = await fetch(`${anilibriaApi}title?code=${code}`);
        const data = await response.json();
        setAnime(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching anime by code:', error);
      }
    };

    fetchAnimeByCode(params.code);
    setLoading(true);
  }, [params.code]);

  return (
    <main className="anime">
      {loading ? (
        <Preloader />
      ) : (
        <div className="anime__container">
          <div className="anime__details">
            <img className="anime__image" src={`${litelibriaPostersApi}${anime.id}`} alt="" />
            <div className="anime__text">
              <h1 className="anime__title">{anime.names && anime.names.ru}</h1>
              <div className="anime__year-section">
                <span className="anime__subtitle">Год: </span>
                <p className="anime__year">{anime.season && anime.season.year}</p>
              </div>
              <div className="anime__status-section">
                <span className="anime__subtitle">Статус: </span>
                <p
                  className={
                    anime.type && anime.type.episodes <= anime.player.episodes.last
                      ? 'anime__status'
                      : 'anime__status anime__status--secondary'
                  }>
                  {anime.type &&
                    anime.player &&
                    (anime.type.string === 'MOVIE'
                      ? 'Завершен'
                      : anime.type.episodes === anime.player.episodes.last
                      ? 'Завершен'
                      : 'Онгоинг')}
                </p>
              </div>
              <p className="anime__series">
                <span className="anime__subtitle">Тип: </span>
                {anime.type && anime.type.string === 'MOVIE'
                  ? 'Фильм'
                  : anime.type && anime.type.string}
                , ({anime.player && anime.player.episodes.last} из{' '}
                {anime.type && anime.type.string === 'MOVIE'
                  ? 1
                  : anime.type && anime.type.episodes
                  ? anime.type.episodes
                  : '?'}{' '}
                эп.), {anime.type && anime.type.length} мин.
              </p>
              <p className="anime__genres">
                <span className="anime__subtitle">Жанры: </span>
                {anime.genres && anime.genres.join(', ')}
              </p>
              <p className="anime__description">{anime.description}</p>
            </div>
          </div>
          <Iframe anime={anime} />
        </div>
      )}
    </main>
  );
};

export default Anime;
