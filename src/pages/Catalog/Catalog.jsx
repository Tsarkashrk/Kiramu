import React, { useEffect, useState } from 'react';

import { anilibriaApi } from '../../constants/api';

import Card from '../../components/ui/Card/Card';
import Preloader from '../../components/ui/Preloader/Preloader';

const Catalog = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${anilibriaApi}title/updates?limit=50`);
        const data = await response.json();
        setAnimes(data.list);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching anime:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="catalog">
      <div className="search-page__container">
        {loading ? <Preloader /> : <Card animes={animes} />}
      </div>
    </main>
  );
};

export default Catalog;
