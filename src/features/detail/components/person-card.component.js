import React from 'react';
import styled from 'styled-components/native';

import { POSTERS } from '../../../api/constants';
import { Text } from '../../../components/typography/text.component';

const Container = styled.View`
  width: 150px;
  flex-direction: column;
  align-items: center;
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

const Header = styled.View`
  height: 20px;
  width: 100%;
  justify-content: flex-end;
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

export const PersonCard = (person) => {
  const p = person.person;
  const source = `${POSTERS}${p.profile_path}`;
  return (
    <Container>
      <Card>
        <Header>
          <InfoText>{p.name}</InfoText>
        </Header>
        <Thumbnail resizeMode="cover" source={{ uri: source }} />
        <Footer>
          <InfoText>{p.character}</InfoText>
        </Footer>
      </Card>
    </Container>
  );
};
