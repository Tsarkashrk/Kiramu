import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./components/screens/Home/Home";
import Categories from "./components/screens/Categories/Categories";
import Filter from "./components/screens/Filter/Filter";
import NotFound from "./components/screens/NotFound/NotFound";
import List from "./components/screens/List/List";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="list" element={<List />}></Route>
          <Route path="categories" element={<Categories />}></Route>
          <Route path="filter" element={<Filter />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
  );
};

export default App;
