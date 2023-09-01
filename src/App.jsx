import React from "react";
import { Routes, Route} from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Filter from "./pages/Filter";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Home /> }></Route>
          <Route path="categories" element={ <Categories /> }></Route>
          <Route path="filter" element={ <Filter />}></Route>
          <Route path="*" element={ <NotFound />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App;