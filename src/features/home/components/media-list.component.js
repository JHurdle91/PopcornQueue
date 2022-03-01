import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, ListContainer, MediaFlatList } from './list.styles';
import { MediaCard } from './media-card.component';
import { MoviesContext } from '../../../services/movies/movies.context';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { TvContext } from '../../../services/tv/tv.context';

export const MediaList = ({ navigation, title, mediaType, data, list }) => {
  const { changeMovieId, retrieveMovieList } = useContext(MoviesContext);
  const { changeSeriesId, retrieveSeriesList } = useContext(TvContext);
  const [page, setPage] = useState(1);

  const changeId = mediaType === 'Movie' ? changeMovieId : changeSeriesId;
  const retrieve =
    mediaType === 'Movie' ? retrieveMovieList : retrieveSeriesList;

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

  const getNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    retrieve(list, page);
  }, [retrieve, list, page]);

  return (
    <Container>
      <Spacer position="left" size="medium">
        <Text variant="heading">{title}</Text>
      </Spacer>
      <ListContainer>
        <MediaFlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${title}-${item.id}`}
          initialNumToRender={5}
          onEndReached={getNextPage}
        />
      </ListContainer>
    </Container>
  );
};
