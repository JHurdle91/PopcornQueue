import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import { Text } from '../../../components/typography/text.component';

const windowHeight = Dimensions.get('window').height;

export const Backdrop = styled.Image`
  height: ${windowHeight / 3}px;
`;

export const Title = styled(Text)`
  text-align: center;
`;

export const GenreContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

export const Options = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const StatusButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 25%;
`;

export const InfoContainer = styled.View`
  padding: 10px;
`;

export const Divider = styled.View`
  border: 1px solid ${(props) => props.theme.colors.brand.primary};
`;
