import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../../components/ui/Card/Card';
import Preloader from '../../components/ui/Preloader/Preloader';
import NotFound from '../NotFound/NotFound';

const SearchPage = () => {
  const API_URL = 'https://api.anilibria.tv/v3/';

  const [anime, setAnime] = useState({});
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const fetchAnime = async (text) => {
    const response = await fetch(`${API_URL}title/search?search=${text}&limit=-1`);
    const data = await response.json();
    setAnime(data.list);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnime(params.text);
  }, [params.text]);

  return (
    <main className="search-page">
      <h1 className="search-page__title">По вашему запросу найдено {anime.length} аниме</h1>
      {loading ? <Preloader /> : <Card animes={anime} />}
    </main>
  );
};

export default SearchPage;
