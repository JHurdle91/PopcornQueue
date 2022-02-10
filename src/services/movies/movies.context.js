import React, { createContext, useEffect, useState } from 'react';

import {
  GetMovieCredits,
  GetMovieDetails,
  GetMovieList,
  GetMovieRecommendations,
} from '../../api/movies.api';
import { combineMovieInfo } from './movies.service';
import { moviesTransform } from './movies.service';

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularMoviesPages, setPopularMoviesPages] = useState([]);
  const [moviesInTheatres, setMoviesInTheatres] = useState([]);
  const [moviesInTheatresPages, setMoviesInTheatresPages] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [upcomingMoviesPages, setUpcomingMoviesPages] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedMoviesPages, setTopRatedMoviesPages] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieRecommendations, setMovieRecommendations] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [movie, setMovie] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [error, setError] = useState(null);

  const MovieLists = {
    popular: {
      keyword: 'popular',
      movies: popularMovies,
      setMovies: setPopularMovies,
      pages: popularMoviesPages,
      setPages: setPopularMoviesPages,
    },
    inTheatres: {
      keyword: 'now_playing',
      movies: moviesInTheatres,
      setMovies: setMoviesInTheatres,
      pages: moviesInTheatresPages,
      setPages: setMoviesInTheatresPages,
    },
    upcoming: {
      keyword: 'upcoming',
      movies: upcomingMovies,
      setMovies: setUpcomingMovies,
      pages: upcomingMoviesPages,
      setPages: setUpcomingMoviesPages,
    },
    topRated: {
      keyword: 'top_rated',
      movies: topRatedMovies,
      setMovies: setTopRatedMovies,
      pages: topRatedMoviesPages,
      setPages: setTopRatedMoviesPages,
    },
  };

  const retrieveMovieList = async (list, page = 1) => {
    const { keyword, movies, setMovies, pages, setPages } = MovieLists[list];
    if (pages.includes(page)) {
      return;
    }
    setPages([...pages, page]);
    try {
      let result = await GetMovieList(keyword, page);
      result = moviesTransform(result);
      setMovies([...movies, ...result]);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    retrieveMovieList('popular', 1);
    retrieveMovieList('inTheatres', 1);
    retrieveMovieList('upcoming', 1);
    retrieveMovieList('topRated', 1);
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
    setMovieRecommendations(null);
    try {
      let mr = await GetMovieRecommendations(id);
      mr = moviesTransform(mr);
      setMovieRecommendations(mr);
    } catch (err) {
      setError(err);
    }
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
        error,
        movieDetails,
        changeMovieId: onChangeId,
        movie,
        movieRecommendations,
        moviesInTheatres,
        upcomingMovies,
        topRatedMovies,
        retrieveMovieList,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
