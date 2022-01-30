import axios from 'axios';
import { TMDB_API_KEY } from '@env';

import { MOVIE } from './constants';

export const GetPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${MOVIE}/popular?api_key=${TMDB_API_KEY}&language=en-US`
    );
    return response.data.results;
  } catch (err) {
    throw new Error(err);
  }
};

export const GetMovieDetails = async (id) => {
  try {
    const response = await axios.get(
      `${MOVIE}/${id}?api_key=${TMDB_API_KEY}&language=en-US`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const GetMovieCredits = async (id) => {
  try {
    const response = await axios.get(
      `${MOVIE}/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
