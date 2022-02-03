import React from 'react';

import { Cover, PaperCard } from './card.styles';
import { POSTERS } from '../../../api/constants';

export const MovieCard = (movie) => {
  const m = movie.movie;
  const source = `${POSTERS}${m.posterPath}`;
  return (
    <PaperCard>
      <Cover resizeMode="cover" source={{ uri: source }} />
    </PaperCard>
  );
};
