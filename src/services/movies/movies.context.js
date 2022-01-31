import React, { createContext, useEffect, useState } from 'react';

import { GetMovieCredits } from '../../api/movies.api';
import { GetMovieDetails } from '../../api/movies.api';
import { GetPopularMovies } from '../../api/movies.api';
import { combineMovieInfo } from './movies.service';
import { moviesTransform } from './movies.service';

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [movie, setMovie] = useState(null);
  const [isLoadingPopular, setIsLoadingPopular] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [error, setError] = useState(null);

  const retrievePopularMovies = async () => {
    setIsLoadingPopular(true);
    setPopularMovies([]);
    try {
      let pm = await GetPopularMovies();
      pm = moviesTransform(pm);
      setPopularMovies(pm);
    } catch (err) {
      setError(err);
    }
    setIsLoadingPopular(false);
  };

  useEffect(() => {
    retrievePopularMovies();
  }, []);

  const retrieveMovieCredits = async (id) => {
    setIsLoadingCredits(true);
    setMovieCredits(null);
    try {
      let mc = await GetMovieCredits(id);
      setMovieCredits(mc);
    } catch (err) {
      setError(err);
    }
    setIsLoadingCredits(false);
  };

  const retrieveMovieDetails = async (id) => {
    setIsLoadingDetails(true);
    setMovieDetails(null);
    try {
      let md = await GetMovieDetails(id);
      md = moviesTransform([md])[0];
      setMovieDetails(md);
    } catch (err) {
      setError(err);
    }
    setIsLoadingDetails(false);
  };

  const onChangeId = async (id) => {
    setMovie(null);
    await retrieveMovieDetails(id);
    await retrieveMovieCredits(id);
  };

  const onClearMovie = () => {
    setMovieDetails(null);
    setMovieCredits(null);
    setMovie(null);
  };

  useEffect(() => {
    if (!isLoadingDetails && !isLoadingCredits) {
      setMovie(combineMovieInfo(movieDetails, movieCredits));
    }
  }, [movieDetails, movieCredits, isLoadingDetails, isLoadingCredits]);

  return (
    <MoviesContext.Provider
      value={{
        popularMovies,
        isLoadingPopular,
        isLoadingDetails,
        isLoadingCredits,
        error,
        movieDetails,
        changeId: onChangeId,
        movie,
        clearMovie: onClearMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
