import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../../components/typography/text.component';

const windowHeight = Dimensions.get('window').height;

export const Backdrop = styled.Image`
  height: ${windowHeight / 3}px;
`;

export const Photo = styled.Image`
  height: ${windowHeight / 3}px;
  border-radius: 10px;
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

export const BackButton = styled(Ionicons)`
  padding-left: 16px;
  padding-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const QuickInfo = styled.View`
  align-items: center;
  justify-content: center;
`;

export const OverviewText = styled(Text).attrs({
  variant: 'body',
})`
  text-align: justify;
`;

export const Loading = styled.ActivityIndicator`
  margin-left: -25px;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;
