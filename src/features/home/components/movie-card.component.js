import React from 'react';
import styled from 'styled-components/native';

import { POSTERS } from '../../../api/constants';

const Card = styled.View`
  margin-right: ${(props) => props.theme.space[1]};
  height: 150px;
  width: 100px;
`;

const Thumbnail = styled.Image`
  flex: 1;
  border-radius: 10px;
`;

export const MovieCard = (movie) => {
  const m = movie.movie;
  const source = `${POSTERS}${m.posterPath}`;
  return (
    <Card>
      <Thumbnail resizeMode="cover" source={{ uri: source }} />
    </Card>
  );
};
