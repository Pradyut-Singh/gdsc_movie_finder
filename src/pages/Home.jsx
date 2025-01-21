import React, { useState, useEffect } from 'react';
import searchBg from '../assets/images/netflix_3.jpg';
import Card from '../components/Card';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const searchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.log('Error fetching movies:', error);
    }
    setLoading(false);
  };

  // Load initial random movies
  useEffect(() => {
    const randomMovies = ['Avengers', 'Batman', 'Spider-Man', 'Harry Potter'];
    const randomQuery = randomMovies[Math.floor(Math.random() * randomMovies.length)];
    searchMovies(randomQuery);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchMovies(searchTerm);
    }
  };

  const addToWatchlist = (movie) => {
    const newWatchlist = [...watchlist, movie];
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (imdbID) => {
    const newWatchlist = watchlist.filter(movie => movie.imdbID !== imdbID);
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  return (
    <div className="mx-[2rem] my-[3rem]">
      <h1 className="mx-[4rem] text-2xl font-bold text-white my-[4rem]">Search For Movies</h1>
      <div className="mx-[4rem] h-[12rem] flex items-center justify-center rounded-xl" 
           style={{backgroundImage: `url(${searchBg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <form onSubmit={handleSearch} className="flex">
          <input 
            className="bg-white text-black px-[1rem] py-[0.5rem] w-[30rem] rounded-lg border-[1px] border-white mx-[2rem] focus:outline-none" 
            type="text" 
            placeholder="Search for a movie"
            value={searchTerm}
            onChange={(e) =>setSearchTerm(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-red-600 text-white px-[1rem] py-[0.5rem] rounded-lg hover:bg-red-800"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mx-[4rem] mt-[2rem]">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="flex flex-wrap gap-[1.5rem] justify-center py-[2rem]">
            {movies.map((movie) => (
              <Card
                key={movie.imdbID} 
                movie={movie}
                isInWatchlist={watchlist.some(m => m.imdbID === movie.imdbID)}
                addToWatchlist={addToWatchlist}
                removeFromWatchlist={removeFromWatchlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;