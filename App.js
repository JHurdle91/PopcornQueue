import React from 'react';
import styled from 'styled-components/native';

import { PopularMoviesList } from './src/features/home/components/popular-movies-list.component';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border: 1px solid green;
`;

export default function App() {
  return (
    <Container>
      <PopularMoviesList />
    </Container>
  );
}
