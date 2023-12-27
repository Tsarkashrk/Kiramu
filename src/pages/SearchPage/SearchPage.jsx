import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Card from '../../components/ui/Card/Card';
import Preloader from '../../components/ui/Preloader/Preloader';

const SearchPage = () => {
  const API_URL = 'https://api.anilibria.tv/v3/';

  const [anime, setAnime] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchAnime = async (text) => {
      try {
        const response = await fetch(`${API_URL}title/search?search=${text}&limit=-1`);
        const data = await response.json();
        setAnime(data.list);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching anime by text:', error);
        setLoading(false);
      }
    };

    fetchAnime(params.text);
    setLoading(true);
  }, [params.text]);

  return (
    <main className="search-page">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <h1 className="search-page__title">По вашему запросу найдено {anime.length} аниме</h1>
          <div className="search-page__container">
            <Card animes={anime} />
          </div>
        </>
      )}
    </main>
  );
};

export default SearchPage;
