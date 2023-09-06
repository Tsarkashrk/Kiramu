import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';

import Home from './pages/Home/Home';
import List from './pages/List/List';
import Categories from './pages/Categories/Categories';
import Filter from './pages/Filter/Filter';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='list' element={<List />}></Route>
          <Route path='categories' element={<Categories />}></Route>
          <Route path='filter' element={<Filter />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Route>
      </Routes>
  );
};

export default App;
