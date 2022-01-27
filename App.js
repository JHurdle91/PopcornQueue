import React from 'react';

import { PopularMoviesList } from './src/features/home/components/popular-movies-list.component';
import { SafeArea } from './src/components/utility/safe-area.component';

export default function App() {
  return (
    <SafeArea>
      <PopularMoviesList />
    </SafeArea>
  );
}
