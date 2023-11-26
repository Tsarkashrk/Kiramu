import React from 'react';

import HeroSection from '../../components/HeroSection/HeroSection';
import Heading from '../../components/Heading/Heading';
import SwiperSlider from '../../components/ui/Swiper/SwiperSlider';

const Home = () => {

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
