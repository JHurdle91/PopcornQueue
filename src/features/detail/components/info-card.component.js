import React from 'react';

import { POSTERS } from '../../../api/constants';
import { PaperCard } from './card.styles';
import { Text } from '../../../components/typography/text.component';

export const InfoCard = (item) => {
  const i = item.item;
  const isPerson = !!i.profilePath;

  const title = isPerson ? i.name : i.title;
  const path = isPerson ? i.profilePath : i.posterPath;
  const source = `${POSTERS}${path}`;

  return (
    <PaperCard>
      <PaperCard.Cover resizeMode="cover" source={{ uri: source }} />
      <PaperCard.Content>
        <Text variant="cardTitle">{title}</Text>
        <Text variant="hint">{i.job ? i.job : i.character}</Text>
      </PaperCard.Content>
    </PaperCard>
  );
};
