import React from 'react';

import { PopularMoviesList } from '../components/popular-movies-list.component';
import { ScreenContainer } from '../../../components/utility/screen-container.component';

export const HomeScreen = ({ navigation }) => {
  return (
    <ScreenContainer>
      <PopularMoviesList navigation={navigation} />
    </ScreenContainer>
  );
};
