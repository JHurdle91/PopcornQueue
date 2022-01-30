import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native';

import {
  BackButton,
  Backdrop,
  Divider,
  GenreContainer,
  Header,
  InfoContainer,
  Options,
  StatusButton,
  Title,
} from '../components/movie-detail.styles';
import { GetMovieDetails } from '../../../api/movies.api';
import { POSTERS } from '../../../api/constants';
import { ScreenContainer } from '../../../components/utility/screen-container.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { theme } from '../../../infrastructure/theme';

const mediaStatus = {
  queued: 1,
  good: 2,
  bad: 3,
  ignore: 4,
};

export const MovieDetailScreen = ({ route, navigation }) => {
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
    <ScreenContainer>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton name="md-arrow-back" size={32} color="black" />
        </TouchableOpacity>
      </Header>
      <ScrollView>
        <Backdrop
          resizeMode="cover"
          source={{ uri: `${POSTERS}${movie.backdrop_path}` }}
        />
        <Title variant="title">{movie.title}</Title>
        {movieDetails && (
          <Title variant="caption">{movieDetails.tagline}</Title>
        )}
        <Spacer position="top" size="small">
          <Options>
            <StatusButton onPress={() => updateStatus('queued')}>
              <Ionicons
                name={
                  interest === mediaStatus.queued ? 'md-checkmark' : 'md-add'
                }
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
        <InfoContainer>
          <Divider />
          <GenreContainer>
            {movieDetails &&
              movieDetails.genres.map((genre) => {
                const key = `genre-${movie.id}-${genre.id}`;
                return (
                  <Text key={key} variant="heading">
                    {genre.name}
                  </Text>
                );
              })}
          </GenreContainer>
          <Divider />
          <Spacer position="top" size="medium">
            {movieDetails && (
              <>
                <Text variant="label">
                  TMDB Rating: {movieDetails.vote_average}
                </Text>
                <Text variant="label">
                  Runtime: {movieDetails.runtime} minutes
                </Text>
                <Text variant="label">Released: {movie.release_date}</Text>
              </>
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
        </InfoContainer>
      </ScrollView>
    </ScreenContainer>
  );
};
