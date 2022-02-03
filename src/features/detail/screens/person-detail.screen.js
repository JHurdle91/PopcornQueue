import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';

import {
  BackButton,
  Divider,
  Header,
  InfoContainer,
  Loading,
  LoadingContainer,
  OverviewText,
  Photo,
  QuickInfo,
  Title,
} from '../components/detail.styles';
import { InfoCard } from '../components/info-card.component';
import { MoviesContext } from '../../../services/movies/movies.context';
import { POSTERS } from '../../../api/constants';
import { PeopleContext } from '../../../services/people/people.context';
import { ScreenContainer } from '../../../components/utility/screen-container.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { theme } from '../../../infrastructure/theme';

export const PersonDetailScreen = ({ navigation }) => {
  const { person } = useContext(PeopleContext);
  const { changeMovieId } = useContext(MoviesContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (person && (person.cast || person.crew) && person.birthday) {
      setIsLoaded(true);
    }
  }, [person]);

  useEffect(() => {
    if (isLoaded) {
      setData([
        ...person.crew.filter((item) => item.job === 'Director'),
        ...person.cast,
      ]);
    }
  }, [isLoaded, person]);

  const componentCleanup = () => {
    setIsLoaded(false);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          changeMovieId(item.id);
          navigation.navigate('MovieDetail');
          componentCleanup();
        }}
      >
        <InfoCard item={item} />
      </TouchableOpacity>
    );
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
        <Text variant="pageHeader">Person Info</Text>
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
          <Photo
            resizeMode="center"
            source={{ uri: `${POSTERS}${person.profilePath}` }}
          />
          <Title variant="title">{person.name}</Title>
          <InfoContainer>
            <Divider />
            <Spacer position="top" size="medium">
              <QuickInfo>
                <Text variant="label">
                  Known for: {person.knownForDepartment}
                </Text>
                <Text variant="label">Born: {person.birthday}</Text>
                {person.deathday && (
                  <Text variant="label">
                    Died: {person.deathday} (Age: {person.age})
                  </Text>
                )}
                {!person.deathday && (
                  <Text variant="label">Age: {person.age}</Text>
                )}
              </QuickInfo>
            </Spacer>
            <Spacer position="top" size="small">
              <OverviewText>{person.biography}</OverviewText>
            </Spacer>
            <Spacer position="top" size="medium">
              <Spacer position="bottom" size="medium">
                <Divider />
              </Spacer>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => {
                  if (item.job) {
                    return `personCredits-${person.id}-${item.id}-${item.job}`;
                  } else {
                    return `personCredits-${person.id}-${item.id}-${item.character}`;
                  }
                }}
              />
            </Spacer>
          </InfoContainer>
        </ScrollView>
      )}
    </ScreenContainer>
  );
};
