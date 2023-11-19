import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';

import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import Random from './pages/Random/Random';
import Anime from './pages/Anime/Anime';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='catalog' element={<Catalog />}></Route>
          <Route path='anime/:code' element={<Anime />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Route>
      </Routes>
  );
};

export default App;
