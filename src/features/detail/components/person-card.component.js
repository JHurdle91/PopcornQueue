import React from 'react';

import { POSTERS } from '../../../api/constants';
import { PaperCard } from './card.styles';
import { Text } from '../../../components/typography/text.component';

export const PersonCard = (person) => {
  const p = person.person;
  const source = `${POSTERS}${p.profilePath}`;
  return (
    <PaperCard>
      <PaperCard.Cover resizeMode="cover" source={{ uri: source }} />
      <PaperCard.Content>
        <Text variant="cardTitle">{p.name}</Text>
        <Text variant="hint">{p.job ? p.job : p.character}</Text>
      </PaperCard.Content>
    </PaperCard>
  );
};
