import axios from 'axios';
import { TMDB_API_KEY } from '@env';

import { MOVIE } from './constants';

export const GetPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${MOVIE}/popular?api_key=${TMDB_API_KEY}`
    );
    console.log(response.data);
  } catch (err) {
    throw new Error(err);
  }
};
