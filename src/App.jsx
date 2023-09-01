import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Filter from "./pages/Filter";
import NotFound from "./pages/NotFound";
import { Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/filter" element={ <Filter />}></Route>
        <Route path="*" element={ <NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App;