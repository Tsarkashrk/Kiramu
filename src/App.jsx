import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Home from "./components/screens/Home/Home";
import Categories from "./components/screens/Categories/Categories";
import Filter from "./components/screens/Filter/Filter";
import NotFound from "./components/screens/NotFound/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="categories" element={<Categories />}></Route>
          <Route path="filter" element={<Filter />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
