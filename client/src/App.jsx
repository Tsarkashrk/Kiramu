import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';

import Catalog from './pages/Catalog/Catalog';
import Anime from './pages/Anime/Anime';
import NotFound from './pages/NotFound/NotFound';
import SearchPage from './pages/SearchPage/SearchPage';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import Profile from './pages/Profile/Profile';

import Preloader from './components/ui/Preloader/Preloader';
import PrivateRoute from './utils/PrivateRoute';
import AuthorizedRoute from './utils/AuthorizedRoute';

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
        <Route element={<AuthorizedRoute />}>
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
