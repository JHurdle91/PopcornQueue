import styled from 'styled-components/native';
import React, { useContext } from 'react';
import { List } from 'react-native-paper';
import { ScrollView, View } from 'react-native';

import { MediaContext } from '../../../services/media/media.context';
import { MoviesContext } from '../../../services/movies/movies.context';
import { POSTERS } from '../../../api/constants';
import { Text } from '../../../components/typography/text.component';
import { TvContext } from '../../../services/tv/tv.context';

const QueueItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

export const QueueScreen = ({ navigation, typeFilter, statusFilter }) => {
  const { changeMovieId } = useContext(MoviesContext);
  const { changeSeriesId } = useContext(TvContext);
  const { media, clearMedia } = useContext(MediaContext);

  const NoListText = styled(Text).attrs({
    variant: 'hint',
  })`
    text-align: center;
  `;

  const Thumbnail = styled.Image`
    width: 50px;
    height: 75px;
  `;

  return (
    <View style={{ flex: 1, marginTop: -8, marginBottom: -8 }}>
      <List.Section>
        {!media.length ? (
          <NoListText>Your list is emtpty...</NoListText>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {media.map((item) => {
              const key = `QueueItem-${item.type}-${item.id}`;
              const source = `${POSTERS}${item.posterPath}`;
              if (typeFilter && item.type !== typeFilter) {
                return;
              }
              if (item.status === statusFilter) {
                return (
                  <QueueItem
                    key={key}
                    title={item.title || item.name}
                    left={() => (
                      <Thumbnail
                        resizeMode="cover"
                        resizeMethod="resize"
                        source={{ uri: source }}
                      />
                    )}
                    description={`[${item.year} | ${item.rating}] ${item.overview}`}
                    onPress={() => {
                      if (item.type === 'movie') {
                        changeMovieId(item.id);
                        navigation.navigate('MovieDetail');
                      } else {
                        changeSeriesId(item.id);
                        navigation.navigate('TvDetail');
                      }
                    }}
                  />
                );
              }
            })}
            <QueueItem
              title="Clear"
              left={(props) => (
                <List.Icon {...props} color="red" icon="delete" />
              )}
              description="Clear Media"
              onPress={clearMedia}
            />
          </ScrollView>
        )}
      </List.Section>
    </View>
  );
};
