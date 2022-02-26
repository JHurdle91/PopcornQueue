import React, { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native';

import {
  BackButton,
  Backdrop,
  Divider,
  GenreContainer,
  Header,
  InfoContainer,
  Loading,
  LoadingContainer,
  Options,
  OverviewText,
  QuickInfo,
  StatusButton,
  Title,
} from '../components/detail.styles';
import { InfoCard } from '../components/info-card.component';
import { MediaCard } from '../components/media-card.component';
import { POSTERS } from '../../../api/constants';
import { PeopleContext } from '../../../services/people/people.context';
import { ScreenContainer } from '../../../components/utility/screen-container.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { TvContext } from '../../../services/tv/tv.context';
import { theme } from '../../../infrastructure/theme';

const mediaStatus = {
  queued: 1,
  good: 2,
  bad: 3,
  ignore: 4,
};

export const TvDetailScreen = ({ navigation }) => {
  const { series, seriesRecommendations, changeSeriesId } =
    useContext(TvContext);
  const { changePersonId } = useContext(PeopleContext);
  const [interest, setInterest] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if ((series && series.cast && series.genres, seriesRecommendations)) {
      setIsLoaded(true);
    }
  }, [series, seriesRecommendations]);

  const updateStatus = (status) => {
    if (interest === mediaStatus[status]) {
      setInterest(null);
    } else {
      setInterest(mediaStatus[status]);
    }
  };

  const componentCleanup = () => {
    setIsLoaded(false);
  };

  return (
    <ScreenContainer>
      <Header>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HomeScreen');
            componentCleanup();
          }}
        >
          <BackButton name="md-arrow-back" size={32} color="black" />
        </TouchableOpacity>
        <Text variant="pageHeader">Series Info</Text>
      </Header>
      {!isLoaded ? (
        <LoadingContainer>
          <Loading
            size={50}
            animating={true}
            color={theme.colors.brand.primary}
          />
        </LoadingContainer>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Backdrop
            resizeMode="cover"
            source={{ uri: `${POSTERS}${series.backdropPath}` }}
          />
          <Title variant="title">
            {series.name} ({series.year})
          </Title>
          <Title variant="caption">{series.tagline}</Title>
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
              {series.genres.map((genre) => {
                const key = `genre-${series.id}-${genre.id}`;
                return (
                  <Text key={key} variant="heading">
                    {genre.name}
                  </Text>
                );
              })}
            </GenreContainer>
            <Divider />
            <Spacer position="top" size="medium">
              <QuickInfo>
                <Text variant="label">TMDB Rating: {series.rating}</Text>
              </QuickInfo>
            </Spacer>
            <Spacer position="top" size="small">
              <OverviewText>{series.overview}</OverviewText>
            </Spacer>
            <Spacer position="top" size="medium">
              <Spacer position="bottom" size="medium">
                <Divider />
              </Spacer>
              <Text variant="heading">Cast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {series.crew.map((person) => {
                  const key = `seriesCredits-${series.id}-${person.id}-${person.character}`;
                  if (person.job === 'Director') {
                    return (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          changePersonId(person.id);
                          navigation.navigate('PersonDetail');
                          componentCleanup();
                        }}
                      >
                        <InfoCard item={person} />
                      </TouchableOpacity>
                    );
                  }
                })}
                {series.cast.map((person) => {
                  const key = `seriesCredits-${series.id}-${person.id}-${person.job}`;
                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={() => {
                        changePersonId(person.id);
                        navigation.navigate('PersonDetail');
                        componentCleanup();
                      }}
                    >
                      <InfoCard item={person} />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </Spacer>
            <Spacer position="top" size="medium">
              <Spacer position="bottom" size="medium">
                <Divider />
              </Spacer>
              <Text variant="heading">Recommendations</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {seriesRecommendations.map((item) => {
                  const key = `seriesRecs-${item.id}`;
                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={() => {
                        changeSeriesId(item.id);
                        navigation.navigate('TvDetail');
                        componentCleanup();
                      }}
                    >
                      <MediaCard item={item} />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </Spacer>
          </InfoContainer>
        </ScrollView>
      )}
    </ScreenContainer>
  );
};
