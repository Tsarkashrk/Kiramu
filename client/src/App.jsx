import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';

import Catalog from './pages/Catalog/Catalog';
import Anime from './pages/Anime/Anime';
import NotFound from './pages/NotFound/NotFound';
import SearchPage from './pages/SearchPage/SearchPage';
import Auth from './pages/Auth/Auth';

import Preloader from './components/ui/Preloader/Preloader';
  
const Home = lazy(() => import('./pages/Home/Home'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<Preloader />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="catalog" element={<Catalog />} />
        <Route path="anime/:code" element={<Anime />} />
        <Route path="random" element={<Anime />} />
        <Route path="search/:text" element={<SearchPage />} />
        <Route path="auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
