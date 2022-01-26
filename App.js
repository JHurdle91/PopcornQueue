import React from 'react';
import styled from 'styled-components/native';
import { MY_VAR } from '@env';
import { Text } from 'react-native';

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return (
    <StyledView>
      <Text>{MY_VAR}</Text>
    </StyledView>
  );
}
