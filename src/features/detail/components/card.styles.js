import styled from 'styled-components/native';
import { Card } from 'react-native-paper';

const width = 150;

export const PaperCard = styled(Card)`
  width: ${width}px;
  margin-right: ${(props) => props.theme.space[1]};
  flex: 1;
`;

export const Cover = styled(Card.Cover)`
  height: ${(width * 3) / 2}px;
`;
