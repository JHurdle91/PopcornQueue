import React, { useContext } from 'react';
import { ScrollView } from 'react-native';

import { MediaList } from '../components/media-list.component';
import { MoviesContext } from '../../../services/movies/movies.context';
import { ScreenContainer } from '../../../components/utility/screen-container.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { TvContext } from '../../../services/tv/tv.context';

export const HomeScreen = ({ navigation }) => {
  const { popularMovies, upcomingMovies, topRatedMovies } =
    useContext(MoviesContext);
  const { popularSeries, topRatedSeries } = useContext(TvContext);

  const Lists = [
    {
      title: 'Popular Movies',
      mediaType: 'Movie',
      data: popularMovies,
      list: 'popular',
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
      data: popularSeries,
      list: 'popular',
    },
    {
      title: 'Top Rated TV Shows',
      mediaType: 'Tv',
      data: topRatedSeries,
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
