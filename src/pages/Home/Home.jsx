import React, { useState, useEffect } from 'react';

import HeroSection from '../../components/HeroSection/HeroSection';
import Heading from '../../components/Heading/Heading';
import SwiperSlider from '../../components/ui/Swiper/SwiperSlider';

const Home = () => {
  const API_URL = 'https://api.anilibria.tv/v3/';

  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const response = await fetch(`${API_URL}title/updates?limit=100`);
      const data = await response.json();
      setAnimeList(data.list);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="home">
        <HeroSection />

        <Heading title="ВОЗМОЖНО, ВАМ ПОНРАВИТСЯ" description="Лучшие аниме на нашем сайте" />
      </main>

      <SwiperSlider />
    </>
  );
};

export default Home;
