import React, { useEffect, useState } from 'react';

import Card from '../../components/ui/Card/Card';
import Preloader from '../../components/ui/Preloader/Preloader';

const Catalog = () => {
  const API_URL = 'https://api.anilibria.tv/v3/';

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const response = await fetch(`${API_URL}title/updates?limit=100`);
      const data = await response.json();
      setAnimes(data.list);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main className="catalog">{loading ? <Preloader /> : <Card animes={animes} />}</main>
  );
};

export default Catalog; 