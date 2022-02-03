import React from 'react';

import { Cover, PaperCard } from './card.styles';
import { POSTERS } from '../../../api/constants';

export const MediaCard = (item) => {
  const i = item.item;
  const source = `${POSTERS}${i.posterPath}`;
  return (
    <PaperCard>
      <Cover resizeMode="cover" source={{ uri: source }} />
    </PaperCard>
  );
};
