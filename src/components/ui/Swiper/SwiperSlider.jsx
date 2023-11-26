import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const SwiperSlider = () => {
  const API_URL = 'https://api.anilibria.tv/v3/';
  const POSTER_URL = 'https://www.anilibria.tv';

  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.realIndex);
  };

  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const response = await fetch(`${API_URL}title/updates?limit=10`);
      const data = await response.json();
      setAnimeList(data.list);
    };

    fetchData();
  }, []);

  return (
    <>
      <Swiper
        className="swiper"
        modules={[Autoplay, Navigation]}
        spaceBetween={-25}
        slidesPerView={2.25}
        navigation={{
          prevEl: '.swiper__button--first',
          nextEl: '.swiper__button--second',
        }}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSlideChange={(swiper) => handleSlideChange(swiper)}>
        {animeList.map((anime, i) => {
          const isSlideActive = i === activeSlide;
          const slideClass = isSlideActive
            ? 'swiper__slide swiper__slide--active'
            : 'swiper__slide';
          return (
            <SwiperSlide className={slideClass} key={i}>
              <NavLink className="swiper__link" to={`/anime/${anime.code}`}>
                <img
                  className="swiper__image"
                  src={`${POSTER_URL}/${anime.posters.medium.url}`}
                  alt="poster"
                />
                <div className="swiper__details">
                  <div className="swiper__text">
                    <h2 className="swiper__title">{anime.names.ru}</h2>
                    <p className="swiper__description">{anime.description}</p>
                  </div>
                  <div className="swiper__stats">
                    <div className="swiper__year-status">
                      <p className="swiper__year">{anime.season.year}</p>
                      <p className="swiper__status">
                        {anime.player.episodes.last === anime.type.episodes
                          ? 'Завершен'
                          : 'Онгоинг'}
                      </p>
                    </div>
                    <span className="swiper__series">
                      <span className="swiper__subtitle">Эпизодов: </span>
                      {anime.player.episodes.last} из {''}
                      {anime.type.episodes ? anime.type.episodes : '?'}
                    </span>
                    <span className="swiper__genres">
                      <span className="swiper__subtitle">Жанры: </span>
                      {anime.genres.join(', ')}
                    </span>
                  </div>
                </div>
              </NavLink>
            </SwiperSlide>
          );
        })}
        <div className="swiper__buttons">
          <button className="swiper__button--first">
          <img className='swiper__arrow' src="/images/arrow-left.png" alt="arrow-left" />
          </button>
          <button className="swiper__button--second">
          <img className='swiper__arrow' src="/images/arrow-right.png" alt="arrow-right" />
          </button>
        </div>
      </Swiper>
    </>
  );
};

export default SwiperSlider;
