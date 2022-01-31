import React, { createContext, useEffect, useState } from 'react';

import { GetPopularMovies } from '../../api/movies.api';
import { moviesTransform } from './movies.service';

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrievePopularMovies = async () => {
    setIsLoading(true);
    setPopularMovies([]);
    try {
      let pm = await GetPopularMovies();
      pm = moviesTransform(pm);
      setPopularMovies(pm);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    retrievePopularMovies();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        popularMovies,
        isLoading,
        error,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
