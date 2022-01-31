import React, { createContext, useEffect, useState } from 'react';

import { GetMovieDetails } from '../../api/movies.api';
import { GetPopularMovies } from '../../api/movies.api';
import { moviesTransform } from './movies.service';

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieId, setMovieId] = useState(null);
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

  const retrieveMovieDetails = async (id) => {
    setIsLoading(true);
    setMovieDetails(null);
    try {
      let md = await GetMovieDetails(id);
      md = moviesTransform([md])[0];
      setMovieDetails(md);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    retrievePopularMovies();
  }, []);

  useEffect(() => {
    retrieveMovieDetails(movieId);
  }, [movieId]);

  return (
    <MoviesContext.Provider
      value={{
        popularMovies,
        isLoading,
        error,
        movieDetails,
        setMovieId,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
