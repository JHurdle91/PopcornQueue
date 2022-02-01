import React from 'react';
import { ScrollView } from 'react-native';

import { MoviesInTheatresList } from '../components/movies-in-theatres-list.component';
import { PopularMoviesList } from '../components/popular-movies-list.component';
import { ScreenContainer } from '../../../components/utility/screen-container.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { TopRatedMoviesList } from '../components/top-rated-movies-list.component';
import { UpcomingMoviesList } from '../components/upcoming-movies-list.component';

export const HomeScreen = ({ navigation }) => {
  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer position="bottom" size="large">
          <PopularMoviesList navigation={navigation} />
          <Spacer position="top" size="medium">
            <MoviesInTheatresList navigation={navigation} />
          </Spacer>
          <Spacer position="top" size="medium">
            <UpcomingMoviesList navigation={navigation} />
          </Spacer>
          <Spacer position="top" size="medium">
            <TopRatedMoviesList navigation={navigation} />
          </Spacer>
        </Spacer>
      </ScrollView>
    </ScreenContainer>
  );
};
