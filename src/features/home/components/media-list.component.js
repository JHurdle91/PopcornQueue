import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, MediaFlatList } from './list.styles';
import { MediaCard } from './media-card.component';
import { MoviesContext } from '../../../services/movies/movies.context';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { TvContext } from '../../../services/tv/tv.context';

export const MediaList = ({ navigation, title, mediaType, data }) => {
  const { changeMovieId } = useContext(MoviesContext);
  const { changeShowId } = useContext(TvContext);

  const changeId = mediaType === 'Movie' ? changeMovieId : changeShowId;

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          changeId(item.id);
          navigation.navigate(`${mediaType}Detail`);
        }}
      >
        <MediaCard item={item} />
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <Spacer position="left" size="medium">
        <Text variant="heading">{title}</Text>
      </Spacer>
      <MediaFlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${title}-${item.id}`}
      />
    </Container>
  );
};
