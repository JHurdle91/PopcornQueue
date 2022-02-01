import React from 'react';

import {
  Card,
  Container,
  Footer,
  Header,
  InfoText,
  Thumbnail,
} from './card.styles';
import { POSTERS } from '../../../api/constants';

export const PersonCard = (person) => {
  const p = person.person;
  const source = `${POSTERS}${p.profilePath}`;
  return (
    <Container>
      <Card>
        <Header>
          <InfoText>{p.name}</InfoText>
        </Header>
        <Thumbnail resizeMode="cover" source={{ uri: source }} />
        <Footer>
          <InfoText>{p.job ? p.job : p.character}</InfoText>
        </Footer>
      </Card>
    </Container>
  );
};
