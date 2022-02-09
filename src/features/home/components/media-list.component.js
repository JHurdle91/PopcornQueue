import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { Container, ListContainer } from './list.styles';
import { MediaCard } from './media-card.component';
import { MoviesContext } from '../../../services/movies/movies.context';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { TvContext } from '../../../services/tv/tv.context';

export const MediaList = ({ navigation, title, mediaType, data }) => {
  const { changeMovieId } = useContext(MoviesContext);
  const { changeShowId } = useContext(TvContext);

  const changeId = mediaType === 'Movie' ? changeMovieId : changeShowId;

  return (
    <Container>
      <Spacer position="left" size="medium">
        <Text variant="heading">{title}</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Spacer position="left" size="small" />
        <ListContainer>
          {data.map((item) => {
            const key = `${title}-${item.id}`;
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  changeId(item.id);
                  navigation.navigate(`${mediaType}Detail`);
                }}
              >
                <MediaCard item={item} />
              </TouchableOpacity>
            );
          })}
        </ListContainer>
      </ScrollView>
    </Container>
  );
};
