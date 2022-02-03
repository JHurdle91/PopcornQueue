import React from 'react';

import { Cover, PaperCard } from './card.styles';
import { POSTERS } from '../../../api/constants';
import { Text } from '../../../components/typography/text.component';

export const MovieCreditCard = (movie) => {
  const m = movie.movie;
  const source = `${POSTERS}${m.posterPath}`;
  return (
    <PaperCard>
      <Cover resizeMode="cover" source={{ uri: source }} />
      <PaperCard.Content>
        <Text variant="cardTitle">{m.title}</Text>
        <Text variant="hint">{m.job ? m.job : m.character}</Text>
      </PaperCard.Content>
    </PaperCard>
  );
};
