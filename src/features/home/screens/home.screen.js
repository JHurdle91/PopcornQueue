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

  const Lists = [
    {
      title: 'Popular Movies',
      mediaType: 'Movie',
      data: popularMovies,
      list: 'popular',
    },
    {
      title: 'In Theatres',
      mediaType: 'Movie',
      data: moviesInTheatres,
      list: 'inTheatres',
    },
    {
      title: 'Coming Soon',
      mediaType: 'Movie',
      data: upcomingMovies,
      list: 'upcoming',
    },
    {
      title: 'Top Rated Movies',
      mediaType: 'Movie',
      data: topRatedMovies,
      list: 'topRated',
    },
    {
      title: 'Popular TV Shows',
      mediaType: 'Tv',
      data: popularShows,
      list: 'popular',
    },
  ];

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Lists.map((item) => {
          const { title, mediaType, data, list } = item;
          return (
            <Spacer position="bottom" size="medium" key={`${title}-list`}>
              <MediaList
                navigation={navigation}
                title={title}
                mediaType={mediaType}
                data={data}
                list={list}
              />
            </Spacer>
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};
