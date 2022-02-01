import React from 'react';
import styled from 'styled-components/native';

import { POSTERS } from '../../../api/constants';
import { Text } from '../../../components/typography/text.component';

const Container = styled.View`
  width: 150px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-right: ${(props) => props.theme.space[1]};
`;

const Card = styled.View`
  width: 100%;
`;

const Thumbnail = styled.Image`
  border-radius: 10px;
  height: 225px;
  width: 100%;
`;

const Footer = styled.View`
  width: 100%;
  justify-content: flex-start;
`;

const InfoText = styled(Text).attrs({
  variant: 'caption',
})`
  text-align: center;
`;

export const MovieRecommendationCard = (movie) => {
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
