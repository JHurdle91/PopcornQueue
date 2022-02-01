import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { Container, ListContainer } from './list.styles';
import { MovieCard } from './movie-card.component';
import { MoviesContext } from '../../../services/movies/movies.context';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';

export const UpcomingMoviesList = ({ navigation }) => {
  const { upcomingMovies, changeMovieId } = useContext(MoviesContext);

  return (
    <Container>
      <Spacer position="left" size="medium">
        <Text variant="heading">Coming Soon</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Spacer position="left" size="small" />
        <ListContainer>
          {upcomingMovies.map((movie) => {
            const key = `upcomingMovies-${movie.id}`;
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
        </ListContainer>
      </ScrollView>
    </Container>
  );
};
