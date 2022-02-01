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

export const MovieCreditCard = (movie) => {
  const m = movie.movie;
  const source = `${POSTERS}${m.posterPath}`;
  return (
    <Container>
      <Card>
        <Header>
          <InfoText>{m.title}</InfoText>
        </Header>
        <Thumbnail resizeMode="cover" source={{ uri: source }} />
        <Footer>
          <InfoText>{m.job ? m.job : m.character}</InfoText>
        </Footer>
      </Card>
    </Container>
  );
};
