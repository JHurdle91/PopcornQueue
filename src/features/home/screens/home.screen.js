import React from 'react';

import { MoviesInTheatresList } from '../components/movies-in-theatres-list.component';
import { PopularMoviesList } from '../components/popular-movies-list.component';
import { ScreenContainer } from '../../../components/utility/screen-container.component';
import { Spacer } from '../../../components/spacer/spacer.component';

export const HomeScreen = ({ navigation }) => {
  return (
    <ScreenContainer>
      <PopularMoviesList navigation={navigation} />
      <Spacer position="top" size="medium">
        <MoviesInTheatresList navigation={navigation} />
      </Spacer>
    </ScreenContainer>
  );
};
