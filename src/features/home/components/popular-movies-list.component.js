import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { GetPopularMovies } from '../../../api/movies.api';
import { MovieCard } from './movie-card.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';

const Wrapper = styled.View``;

export const PopularMoviesList = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState(null);

  useEffect(() => {
    (async () => {
      const pm = await GetPopularMovies();
      setPopularMovies(pm);
    })();
  }, []);

  return (
    <Wrapper>
      <Spacer position="left" size="medium">
        <Text variant="heading">Popular Movies</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Spacer position="left" size="small" />
        {popularMovies &&
          popularMovies.map((movie) => {
            const key = `popularMovies - ${movie.id}`;
            return (
              <TouchableOpacity
                key={key}
                onPress={() =>
                  navigation.navigate('MovieDetail', {
                    movie,
                  })
                }
              >
                <MovieCard movie={movie} />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </Wrapper>
  );
};
