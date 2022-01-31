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
  OverviewText,
  QuickInfo,
  StatusButton,
  Title,
} from '../components/movie-detail.styles';
import { GetMovieCredits } from '../../../api/movies.api';
import { GetMovieDetails } from '../../../api/movies.api';
import { POSTERS } from '../../../api/constants';
import { PersonCard } from '../components/person-card.component';
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
  const [movieCredits, setMovieCredits] = useState(null);
  const [interest, setInterest] = useState(null);

  useEffect(() => {
    (async () => {
      const md = await GetMovieDetails(movie.id);
      setMovieDetails(md);
    })();
  }, [movie.id]);

  useEffect(() => {
    (async () => {
      const mc = await GetMovieCredits(movie.id);
      setMovieCredits(mc);
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
              <QuickInfo>
                <Text variant="label">
                  TMDB Rating: {movieDetails.vote_average}
                </Text>
                <Text variant="label">Released: {movie.release_date}</Text>
                <Text variant="label">
                  Runtime: {movieDetails.runtime} minutes
                </Text>
              </QuickInfo>
            )}
          </Spacer>
          <Spacer position="top" size="small">
            <OverviewText>{movie.overview}</OverviewText>
          </Spacer>
          <Spacer position="top" size="medium">
            <Spacer position="bottom" size="medium">
              <Divider />
            </Spacer>
            {movieCredits && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {movieCredits.crew.map((person) => {
                  const key = `movieCredits-${movie.id}-${person.id}`;
                  if (person.job === 'Director') {
                    return (
                      <TouchableOpacity
                        key={key}
                        onPress={() =>
                          navigation.navigate('PersonDetail', {
                            person,
                          })
                        }
                      >
                        <PersonCard person={person} />
                      </TouchableOpacity>
                    );
                  }
                })}
                {movieCredits.cast.map((person) => {
                  const key = `movieCredits-${movie.id}-${person.id}`;
                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={() =>
                        navigation.navigate('PersonDetail', {
                          person,
                        })
                      }
                    >
                      <PersonCard person={person} />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </Spacer>
        </InfoContainer>
      </ScrollView>
    </ScreenContainer>
  );
};
