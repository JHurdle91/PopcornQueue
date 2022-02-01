import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { Container, ListContainer } from './list.styles';
import { MovieCard } from './movie-card.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { TvContext } from '../../../services/tv/tv.context';

export const PopularShowsList = ({ navigation }) => {
  const { popularShows, changeShowId } = useContext(TvContext);

  return (
    <Container>
      <Spacer position="left" size="medium">
        <Text variant="heading">Popular TV Shows</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Spacer position="left" size="small" />
        <ListContainer>
          {popularShows.map((show) => {
            const key = `popularShows-${show.id}`;
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  changeShowId(show.id);
                  navigation.navigate('TvDetail');
                }}
              >
                <MovieCard movie={show} />
              </TouchableOpacity>
            );
          })}
        </ListContainer>
      </ScrollView>
    </Container>
  );
};
