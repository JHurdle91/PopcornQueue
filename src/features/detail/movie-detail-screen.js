import React from 'react';
import { Image } from 'react-native';

import { POSTERS } from '../../api/constants';
import { Text } from '../../components/typography/text.component';

export const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;
  return (
    <Image
      style={{ flex: 1 }}
      source={{ uri: `${POSTERS}${movie.poster_path}` }}
    />
  );
};
