import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Anime = () => {
  const [anime, setAnime] = useState({});
  const params = useParams();

  const API_URL = 'https://api.anilibria.tv/v3/';
  const POSTER_URL = 'https://api.litelibria.com/posters/';

  const list = async () => {
    const response = await fetch(`${API_URL}title?code=${params.code}`);
    const data = await response.json();
    setAnime(data);
    console.log(data);
  };

  useEffect(() => {
    list();
  }, []);

  return ( 
    <main className='anime'>
      <div className="anime__container">
        <img src={`${POSTER_URL}${anime.id}`} alt=""/>
      </div>
    </main>
  )
}

export default Anime;
