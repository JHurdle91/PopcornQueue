import React from 'react';
import styled from 'styled-components/native';

import { POSTERS } from '../../../api/constants';

const Card = styled.View`
  margin-right: 5px;
  height: ${478 / 3}px;
  width: ${318 / 3}px;
`;

const Thumbnail = styled.Image`
  flex: 1;
  border-radius: 10px;
`;

export const MovieCard = (movie) => {
  const m = movie.movie;
  const source = `${POSTERS}${m.poster_path}`;
  return (
    <Card>
      <Thumbnail resizeMode="cover" source={{ uri: source }} />
    </Card>
  );
};
