import React from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import { HomeScreen } from '../../features/home/screens/home.screen';
import { MovieDetailScreen } from '../../features/detail/screens/movie-detail.screen';
import { PersonDetailScreen } from '../../features/detail/screens/person-detail.screen';
import { TvDetailScreen } from '../../features/detail/screens/tv-detail.screen';

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      detachInactiveScreens
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        ...TransitionPresets.ModalTransition,
      }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="MovieDetail" component={MovieDetailScreen} />
      <HomeStack.Screen name="TvDetail" component={TvDetailScreen} />
      <HomeStack.Screen name="PersonDetail" component={PersonDetailScreen} />
    </HomeStack.Navigator>
  );
};
