import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

import { GetPopularMovies } from './src/api/movies.api';

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  GetPopularMovies();
  return (
    <StyledView>
      <Text>blank canvas</Text>
    </StyledView>
  );
}
