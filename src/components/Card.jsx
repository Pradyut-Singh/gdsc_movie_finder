import React from 'react';

const Card = ({ movie, isInWatchlist, addToWatchlist, removeFromWatchlist }) => {
  const handleWatchlistClick = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movie.imdbID);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className='bg-white rounded-lg p-[0.6rem] w-[18rem] flex flex-col items-center justify-center'>
      <img src={movie.Poster} alt={movie.Title} className="rounded-lg pb-[1rem] w-full h-[20rem] object-cover" />
      <h1 className='font-bold text-black'>{movie.Title}</h1>
      <p className='text-black mb-2'>{movie.Year}</p>
      <button 
        onClick={handleWatchlistClick}
        className={`w-full py-2 rounded-lg ${
          isInWatchlist 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-green-600 hover:bg-green-700'
        } text-white`}
      >
        {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </div>
  );
};

export default Card;