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

export const MediaCard = (item) => {
  const i = item.item;
  const source = `${POSTERS}${i.posterPath}`;
  return (
    <Card>
      <Thumbnail resizeMode="cover" source={{ uri: source }} />
    </Card>
  );
};
