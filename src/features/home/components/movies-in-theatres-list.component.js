import styled from 'styled-components/native';
import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { MovieCard } from './movie-card.component';
import { MoviesContext } from '../../../services/movies/movies.context';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';

const Wrapper = styled.View``;

export const MoviesInTheatresList = ({ navigation }) => {
  const { moviesInTheatres, changeMovieId } = useContext(MoviesContext);

  return (
    <Wrapper>
      <Spacer position="left" size="medium">
        <Text variant="heading">In Theatres</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Spacer position="left" size="small" />
        {moviesInTheatres.map((movie) => {
          const key = `moviesInTheatres-${movie.id}`;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                changeMovieId(movie.id);
                navigation.navigate('MovieDetail');
              }}
            >
              <MovieCard movie={movie} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Wrapper>
  );
};
