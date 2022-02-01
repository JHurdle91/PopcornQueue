import styled from 'styled-components/native';

import { Text } from '../../../components/typography/text.component';

export const Container = styled.View`
  width: 150px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.theme.space[1]};
`;

export const Card = styled.View`
  width: 100%;
`;

export const Thumbnail = styled.Image`
  border-radius: 10px;
  height: 225px;
  width: 100%;
`;

export const Header = styled.View`
  height: 20px;
  width: 100%;
  justify-content: flex-end;
`;

export const Footer = styled.View`
  width: 100%;
  justify-content: flex-start;
`;

export const InfoText = styled(Text).attrs({
  variant: 'caption',
})`
  text-align: center;
`;
