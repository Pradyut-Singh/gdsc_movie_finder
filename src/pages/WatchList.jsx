import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const removeFromWatchlist = (imdbID) => {
    const newWatchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  const clearWatchlist = () => {
    setWatchlist([]);
    localStorage.clear();
  };

  return (
    <div className="mx-[2rem]">
      <div className="flex justify-between items-center">
        <h1 className="mx-[4rem] text-2xl font-bold text-white my-[4rem]">
          WatchList
        </h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={clearWatchlist}>
          Clear Watchlist
        </button>
      </div>
      <div className="flex flex-wrap gap-[1rem] justify-start mx-[4rem]">
        {watchlist.length === 0 ? (
          <p className="text-white">No movies in your watchlist</p>
        ) : (
          watchlist.map((movie) => (
            <Card
              key={movie.imdbID}
              movie={movie}
              isInWatchlist={true}
              removeFromWatchlist={removeFromWatchlist}
              addToWatchlist={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WatchList;
