import axios from 'axios';
import { TMDB_API_KEY } from '@env';

import { MOVIE } from './constants';

export const GetPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${MOVIE}/popular?api_key=${TMDB_API_KEY}`
    );
    return response.data.results;
  } catch (err) {
    throw new Error(err);
  }
};
