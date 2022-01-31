import axios from 'axios';
import { TMDB_API_KEY } from '@env';

import { PERSON } from './constants';

export const GetPersonDetails = async (id) => {
  try {
    const response = await axios.get(
      `${PERSON}/${id}?api_key=${TMDB_API_KEY}&language=en-US`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const GetPersonCredits = async (id) => {
  try {
    const response = await axios.get(
      `${PERSON}/${id}/combined_credits?api_key=${TMDB_API_KEY}&language=en-US`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
