import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { GetPopularMovies } from '../../../api/movies.api';
import { MovieCard } from './movie-card.component';
import { Text } from '../../../components/typography/text.component';

const Wrapper = styled.View`
  border: 1px solid blue;
`;

export const PopularMoviesList = () => {
  const [popularMovies, setPopularMovies] = useState(null);

  useEffect(() => {
    (async () => {
      const pm = await GetPopularMovies();
      setPopularMovies(pm);
    })();
  }, []);

  return (
    <Wrapper>
      <Text variant="heading">Popular Movies</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {popularMovies &&
          popularMovies.map((movie) => {
            const key = `popularMovies - ${movie.id}`;
            return (
              <TouchableOpacity key={key}>
                <MovieCard movie={movie} />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </Wrapper>
  );
};