import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import WatchList from './pages/WatchList';

const App = () => {
  return (
    <>
      <nav className="bg-[#0a0a0a] p-6 text-xl font-semibold">
        <div className="mx-[4rem] flex gap-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/watchlist" className="text-white hover:text-gray-300">Watchlist</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </>
  );
};

export default App;
