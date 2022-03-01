import styled from 'styled-components/native';
import React, { useContext } from 'react';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';

import { MediaContext } from '../../../services/media/media.context';
import { MoviesContext } from '../../../services/movies/movies.context';
import { POSTERS } from '../../../api/constants';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import { TvContext } from '../../../services/tv/tv.context';

const LikesItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

export const LikesScreen = ({ navigation }) => {
  console.log(navigation.state);
  const { changeMovieId } = useContext(MoviesContext);
  const { changeSeriesId } = useContext(TvContext);
  const { media, STATUS, clearMedia } = useContext(MediaContext);

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
    <SafeArea>
      <List.Section>
        {!media.length ? (
          <NoListText>Your list is emtpty...</NoListText>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {media.map((item) => {
              const key = `LikesItem-${item.type}-${item.id}`;
              const source = `${POSTERS}${item.posterPath}`;
              if (item.status === STATUS.good) {
                return (
                  <LikesItem
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
            <LikesItem
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
    </SafeArea>
  );
};
