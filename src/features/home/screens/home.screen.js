import React, { useContext } from 'react';
import { ScrollView } from 'react-native';

import { MediaList } from '../components/media-list.component';
import { MoviesContext } from '../../../services/movies/movies.context';
import { ScreenContainer } from '../../../components/utility/screen-container.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { TvContext } from '../../../services/tv/tv.context';

export const HomeScreen = ({ navigation }) => {
  const { popularMovies, moviesInTheatres, upcomingMovies, topRatedMovies } =
    useContext(MoviesContext);
  const { popularShows } = useContext(TvContext);

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer position="bottom" size="large">
          <MediaList
            navigation={navigation}
            title="Popular Movies"
            mediaType="Movie"
            data={popularMovies}
          />
          <Spacer position="top" size="medium">
            <MediaList
              navigation={navigation}
              title="In Theatres"
              mediaType="Movie"
              data={moviesInTheatres}
            />
          </Spacer>
          <Spacer position="top" size="medium">
            <MediaList
              navigation={navigation}
              title="Coming Soon"
              mediaType="Movie"
              data={upcomingMovies}
            />
          </Spacer>
          <Spacer position="top" size="medium">
            <MediaList
              navigation={navigation}
              title="Top Rated Movies"
              mediaType="Movie"
              data={topRatedMovies}
            />
          </Spacer>
          <Spacer position="top" size="medium">
            <MediaList
              navigation={navigation}
              title="Popular TV Shows"
              mediaType="Tv"
              data={popularShows}
            />
          </Spacer>
        </Spacer>
      </ScrollView>
    </ScreenContainer>
  );
};
