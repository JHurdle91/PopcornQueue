import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

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
import { MovieCard } from '../components/movie-card.component';
import { MoviesContext } from '../../../services/movies/movies.context';
import { POSTERS } from '../../../api/constants';
import { PeopleContext } from '../../../services/people/people.context';
import { ScreenContainer } from '../../../components/utility/screen-container.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { theme } from '../../../infrastructure/theme';

export const PersonDetailScreen = ({ navigation }) => {
  const { person, clearPerson } = useContext(PeopleContext);
  const { changeId } = useContext(MoviesContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (person && (person.cast || person.crew) && person.birthday) {
      setIsLoaded(true);
    }
  }, [person]);

  const componentCleanup = () => {
    setIsLoaded(false);
    clearPerson();
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
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {person.crew.map((item) => {
                  const key = `personCredits-${person.id}-${item.id}-${item.job}`;
                  if (item.job === 'Director') {
                    return (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          changeId(item.id);
                          navigation.navigate('MovieDetail');
                          componentCleanup();
                        }}
                      >
                        <MovieCard movie={item} />
                      </TouchableOpacity>
                    );
                  }
                })}
                {person.cast.map((item) => {
                  const key = `personCredits-${person.id}-${item.id}-${item.character}`;
                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={() => {
                        changeId(item.id);
                        navigation.navigate('MovieDetail');
                        componentCleanup();
                      }}
                    >
                      <MovieCard movie={item} />
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
