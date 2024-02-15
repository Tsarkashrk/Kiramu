import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';

import Catalog from './pages/Catalog/Catalog';
import Anime from './pages/Anime/Anime';
import NotFound from './pages/NotFound/NotFound';
import SearchPage from './pages/SearchPage/SearchPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

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
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
