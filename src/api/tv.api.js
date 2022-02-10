import axios from 'axios';
import { TMDB_API_KEY } from '@env';

import { TV } from './constants';

export const GetSeriesList = async (list, page) => {
  try {
    const response = await axios.get(
      `${TV}/${list}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
    );
    return response.data.results;
  } catch (err) {
    throw new Error(err);
  }
};

export const GetShowDetails = async (id) => {
  try {
    const response = await axios.get(
      `${TV}/${id}?api_key=${TMDB_API_KEY}&language=en-US`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const GetShowCredits = async (id) => {
  try {
    const response = await axios.get(
      `${TV}/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
