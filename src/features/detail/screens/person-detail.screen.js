import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import {
  BackButton,
  Backdrop,
  Divider,
  Header,
  InfoContainer,
  OverviewText,
  QuickInfo,
  Title,
} from '../components/movie-detail.styles';
import { GetPersonCredits } from '../../../api/people.api';
import { GetPersonDetails } from '../../../api/people.api';
import { MovieCard } from '../components/movie-card.component';
import { MoviesContext } from '../../../services/movies/movies.context';
import { POSTERS } from '../../../api/constants';
import { ScreenContainer } from '../../../components/utility/screen-container.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';

export const PersonDetailScreen = ({ route, navigation }) => {
  const { person } = route.params;
  const { changeId } = useContext(MoviesContext);
  const [personDetails, setPersonDetails] = useState(null);
  const [personCredits, setPersonCredits] = useState(null);

  useEffect(() => {
    (async () => {
      const pd = await GetPersonDetails(person.id);
      setPersonDetails(pd);
    })();
  }, [person.id]);

  useEffect(() => {
    (async () => {
      const pc = await GetPersonCredits(person.id);
      setPersonCredits(pc);
    })();
  }, [person.id]);

  return (
    <ScreenContainer>
      <Header>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <BackButton name="md-arrow-back" size={32} color="black" />
        </TouchableOpacity>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Backdrop
          resizeMode="cover"
          source={{ uri: `${POSTERS}${person.profilePath}` }}
        />
        <Title variant="title">{person.name}</Title>
        <InfoContainer>
          <Divider />
          <Spacer position="top" size="medium">
            {personDetails && (
              <QuickInfo>
                <Text variant="label">
                  Known for: {personDetails.known_for_department}
                </Text>
                <Text variant="label">Born: {personDetails.birthday}</Text>
                {personDetails.deathday && (
                  <Text variant="label">Died: {personDetails.deathday}</Text>
                )}
              </QuickInfo>
            )}
          </Spacer>
          {personDetails && (
            <Spacer position="top" size="small">
              <OverviewText>{personDetails.biography}</OverviewText>
            </Spacer>
          )}
          <Spacer position="top" size="medium">
            <Spacer position="bottom" size="medium">
              <Divider />
            </Spacer>
            {personCredits && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {personCredits.crew.map((item) => {
                  const key = `personCredits-${person.id}-${item.id}-${item.job}`;
                  if (item.job === 'Director') {
                    return (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          changeId(item.id);
                          navigation.navigate('MovieDetail');
                        }}
                      >
                        <MovieCard movie={item} />
                      </TouchableOpacity>
                    );
                  }
                })}
                {personCredits.cast.map((item) => {
                  const key = `personCredits-${person.id}-${item.id}-${item.character}`;
                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={() => {
                        changeId(item.id);
                        navigation.navigate('MovieDetail');
                      }}
                    >
                      <MovieCard movie={item} />
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
