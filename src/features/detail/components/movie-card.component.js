import React from 'react';

import { Card, Container, Footer, InfoText, Thumbnail } from './card.styles';
import { POSTERS } from '../../../api/constants';

export const MovieCard = (movie) => {
  const m = movie.movie;
  const source = `${POSTERS}${m.posterPath}`;
  return (
    <Container>
      <Card>
        <Thumbnail resizeMode="cover" source={{ uri: source }} />
        <Footer>
          <InfoText>{m.title}</InfoText>
        </Footer>
      </Card>
    </Container>
  );
};
