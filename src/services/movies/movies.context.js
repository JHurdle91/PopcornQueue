import React, { createContext, useEffect, useState } from 'react';

import { GetMovieCredits } from '../../api/movies.api';
import { GetMovieDetails } from '../../api/movies.api';
import { GetMovieRecommendations } from '../../api/movies.api';
import { GetMoviesInTheatres } from '../../api/movies.api';
import { GetPopularMovies } from '../../api/movies.api';
import { GetTopRatedMovies } from '../../api/movies.api';
import { GetUpcomingMovies } from '../../api/movies.api';
import { combineMovieInfo } from './movies.service';
import { moviesTransform } from './movies.service';

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [moviesInTheatres, setMoviesInTheatres] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieRecommendations, setMovieRecommendations] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [movie, setMovie] = useState(null);
  const [isLoadingPopular, setIsLoadingPopular] = useState(false);
  const [isLoadingTheatres, setIsLoadingTheatres] = useState(false);
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(false);
  const [isLoadingTop, setIsLoadingTop] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
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

  const retrieveMoviesInTheatres = async () => {
    setIsLoadingTheatres(true);
    setMoviesInTheatres([]);
    try {
      let mit = await GetMoviesInTheatres();
      mit = moviesTransform(mit);
      setMoviesInTheatres(mit);
    } catch (err) {
      setError(err);
    }
    setIsLoadingTheatres(false);
  };

  const retrieveUpcomingMovies = async () => {
    setIsLoadingUpcoming(true);
    setUpcomingMovies([]);
    try {
      let um = await GetUpcomingMovies();
      um = moviesTransform(um);
      setUpcomingMovies(um);
    } catch (err) {
      setError(err);
    }
    setIsLoadingUpcoming(false);
  };

  const retrieveTopRatedMovies = async () => {
    setIsLoadingTop(true);
    setTopRatedMovies([]);
    try {
      let trm = await GetTopRatedMovies();
      trm = moviesTransform(trm);
      setTopRatedMovies(trm);
    } catch (err) {
      setError(err);
    }
    setIsLoadingTop(false);
  };

  useEffect(() => {
    retrievePopularMovies();
    retrieveMoviesInTheatres();
    retrieveUpcomingMovies();
    retrieveTopRatedMovies();
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

  const retrieveMovieRecommendations = async (id) => {
    setIsLoadingRecommendations(true);
    setMovieRecommendations(null);
    try {
      let mr = await GetMovieRecommendations(id);
      mr = moviesTransform(mr);
      setMovieRecommendations(mr);
    } catch (err) {
      setError(err);
    }
    setIsLoadingRecommendations(false);
  };

  const onChangeId = async (id) => {
    setMovie(null);
    setMovieDetails(null);
    setMovieCredits(null);
    setMovieRecommendations(null);
    await retrieveMovieDetails(id);
    await retrieveMovieCredits(id);
    await retrieveMovieRecommendations(id);
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
        changeMovieId: onChangeId,
        movie,
        movieRecommendations,
        moviesInTheatres,
        upcomingMovies,
        topRatedMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
