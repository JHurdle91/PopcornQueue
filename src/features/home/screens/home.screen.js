import React from 'react';

import { PopularMoviesList } from '../components/popular-movies-list.component';

export const HomeScreen = ({ navigation }) => {
  return <PopularMoviesList navigation={navigation} />;
};
