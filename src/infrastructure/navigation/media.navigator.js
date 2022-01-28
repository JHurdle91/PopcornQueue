import React from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import { HomeScreen } from '../../features/home/screens/home.screen';
import { MovieDetailScreen } from '../../features/detail/movie-detail-screen';

const MediaStack = createStackNavigator();

export const MediaNavigator = () => {
  return (
    <MediaStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
        ...TransitionPresets.ModalTransition,
      }}
    >
      <MediaStack.Screen name="Home" component={HomeScreen} />
      <MediaStack.Screen name="MovieDetail" component={MovieDetailScreen} />
    </MediaStack.Navigator>
  );
};
