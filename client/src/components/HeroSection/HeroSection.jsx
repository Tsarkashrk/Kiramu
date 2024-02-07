import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Catalog from '../../pages/Catalog/Catalog';

import Button from '../ui/Button/Button';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-section__wrapper">
        <div className="hero-section__heading">
          <h1 className="hero-section__title">ДОБРО ПОЖАЛОВАТЬ НА KIRAMU</h1>

          <p className="hero-section__description">Найди свое аниме</p>
        </div>

        <Routes>
          <Route path="/catalog" element={<Catalog />}></Route>
        </Routes>

        <Button title="Начать смотреть" />
      </div>
    </div>
  );
};

export default HeroSection;
