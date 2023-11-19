import React, { useState } from 'react';

import HeroSection from '../../components/HeroSection/HeroSection';
import Heading from '../../components/Heading/Heading';
import Card from '../../components/ui/Card/Card';

const Home = () => {
  return (
    <main className="home">
      <HeroSection />

      <Heading title="ВОЗМОЖНО, ВАМ ПОНРАВИТСЯ" description="Лучшие аниме на нашем сайте" />
    </main>
  );
};

export default Home;
