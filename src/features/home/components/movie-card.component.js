import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';

import { POSTERS } from '../../../api/constants';

const Card = styled.View`
  height: 100px;
  margin-right: 10px;
  border: 1px solid red;
  justify-content: center;
  flex: 1;
`;

export const MovieCard = (movie) => {
  const m = movie.movie;
  const source = `${POSTERS}${m.poster_path}`;
  return (
    <Card>
      <Image
        style={{
          width: 100,
          height: 100,
        }}
        source={{ uri: source }}
      />
    </Card>
  );
};
