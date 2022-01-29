import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { GetMovieDetails } from '../../api/movies.api';
import { POSTERS } from '../../api/constants';
import { Spacer } from '../../components/spacer/spacer.component';
import { Text } from '../../components/typography/text.component';
import { theme } from '../../infrastructure/theme';

const windowHeight = Dimensions.get('window').height;

const Backdrop = styled.Image`
  height: ${windowHeight / 3}px;
`;

const Title = styled(Text)`
  text-align: center;
`;

const GenreWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

const Options = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const StatusButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 25%;
`;

const InfoWrapper = styled.View`
  padding: 10px;
`;

const Divider = styled.View`
  border: 1px solid ${(props) => props.theme.colors.brand.primary};
`;

const mediaStatus = {
  queued: 1,
  good: 2,
  bad: 3,
  ignore: 4,
};

export const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [interest, setInterest] = useState(null);

  useEffect(() => {
    (async () => {
      const md = await GetMovieDetails(movie.id);
      setMovieDetails(md);
    })();
  }, [movie.id]);

  const updateStatus = (status) => {
    if (interest === mediaStatus[status]) {
      setInterest(null);
    } else {
      setInterest(mediaStatus[status]);
    }
  };

  return (
    <ScrollView>
      <Backdrop
        resizeMode="cover"
        source={{ uri: `${POSTERS}${movie.backdrop_path}` }}
      />
      <Title variant="title">{movie.title}</Title>
      {movieDetails && <Title variant="caption">{movieDetails.tagline}</Title>}
      <Spacer position="top" size="small">
        <Options>
          <StatusButton onPress={() => updateStatus('queued')}>
            <Ionicons
              name={interest === mediaStatus.queued ? 'md-checkmark' : 'md-add'}
              size={48}
              color={
                interest === mediaStatus.queued
                  ? theme.colors.brand.primary
                  : theme.colors.ui.secondary
              }
            />
            <Text variant="caption">My Queue</Text>
          </StatusButton>
          <StatusButton onPress={() => updateStatus('good')}>
            <Ionicons
              name={
                interest === mediaStatus.good
                  ? 'md-thumbs-up'
                  : 'md-thumbs-up-outline'
              }
              size={48}
              color={
                interest === mediaStatus.good
                  ? theme.colors.brand.primary
                  : theme.colors.ui.secondary
              }
            />
            <Text variant="caption">Like</Text>
          </StatusButton>
          <StatusButton onPress={() => updateStatus('bad')}>
            <Ionicons
              name={
                interest === mediaStatus.bad
                  ? 'md-thumbs-down'
                  : 'md-thumbs-down-outline'
              }
              size={48}
              color={
                interest === mediaStatus.bad
                  ? theme.colors.brand.primary
                  : theme.colors.ui.secondary
              }
            />
            <Text variant="caption">Dislike</Text>
          </StatusButton>
          <StatusButton onPress={() => updateStatus('ignore')}>
            <Ionicons
              name={
                interest === mediaStatus.ignore
                  ? 'md-remove-circle'
                  : 'md-remove-circle-outline'
              }
              size={48}
              color={
                interest === mediaStatus.ignore
                  ? theme.colors.ui.error
                  : theme.colors.ui.secondary
              }
            />
            <Text variant="caption">Not Interested</Text>
          </StatusButton>
        </Options>
      </Spacer>
      <InfoWrapper>
        <Divider />
        <GenreWrapper>
          {movieDetails &&
            movieDetails.genres.map((genre) => {
              const key = `genre-${movie.id}-${genre.id}`;
              return (
                <Text key={key} variant="heading">
                  {genre.name}
                </Text>
              );
            })}
        </GenreWrapper>
        <Divider />
        <Spacer position="top" size="medium">
          <Text variant="label">Released: {movie.release_date}</Text>
          {movieDetails && (
            <Text variant="label">Runtime: {movieDetails.runtime} minutes</Text>
          )}
        </Spacer>
        <Spacer position="top" size="small">
          <Text variant="body">{movie.overview}</Text>
        </Spacer>
        <Spacer position="top" size="medium">
          <Divider />
          <Text variant="label">[Credits go here]</Text>
          <Text variant="label">Director, cast, etc</Text>
        </Spacer>
      </InfoWrapper>
    </ScrollView>
  );
};
