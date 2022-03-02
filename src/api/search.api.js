import axios from 'axios';
import { TMDB_API_KEY } from '@env';

import { SEARCH } from './constants';

export const GetMultiSearch = async (keyword) => {
  try {
    const response = await axios.get(
      `${SEARCH}/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
    );
    return response.data.results;
  } catch (err) {
    throw new Error(err);
  }
};
