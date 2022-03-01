import React, { useState } from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

import { theme } from '../../../infrastructure/theme';

export const FilterFab = ({ changeFilter }) => {
  const [isFabOpen, setIsFabOpen] = useState(false);

  const onStateChange = () => {
    setIsFabOpen(!isFabOpen);
  };

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={isFabOpen}
          icon={isFabOpen ? 'popcorn' : 'filter-variant'}
          fabStyle={{ backgroundColor: theme.colors.brand.primary }}
          actions={[
            {
              icon: 'all-inclusive',
              label: 'All Media',
              onPress: () => changeFilter(null),
            },
            {
              icon: 'filmstrip',
              label: 'Movies',
              onPress: () => changeFilter('movie'),
            },
            {
              icon: 'television-classic',
              label: 'TV Series',
              onPress: () => changeFilter('tv'),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};
