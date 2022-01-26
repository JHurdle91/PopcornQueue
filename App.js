import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return (
    <StyledView>
      <Text>blank canvas</Text>
    </StyledView>
  );
}
