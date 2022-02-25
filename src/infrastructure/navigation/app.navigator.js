import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeNavigator } from './home.navigator';
import { MoviesContextProvider } from '../../services/movies/movies.context';
import { PeopleContextProvider } from '../../services/people/people.context';
import { SafeArea } from '../../components/utility/safe-area.component';
import { SettingsNavigator } from './settings.navigator';
import { Text } from '../../components/typography/text.component';
import { TvContextProvider } from '../../services/tv/tv.context';
import { theme } from '../theme/index';

export const AppNavigator = () => {
  const Tab = createBottomTabNavigator();

  const TAB_ICON = {
    Home: 'md-home',
    Queue: 'md-list',
    Friends: 'md-people',
    Settings: 'md-settings',
  };

  const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
      tabBarIcon: ({ size, color }) => (
        <Ionicons name={iconName} size={size} color={color} />
      ),
      headerShown: false,
      tabBarShowLabel: false,
      tabBarAccessibilityLabel: route.name,
      tabBarActiveTintColor: theme.colors.brand.primary,
      tabBarInactiveTintColor: theme.colors.ui.secondary,
      tabBarStyle: [
        {
          display: 'flex',
        },
        null,
      ],
    };
  };

  const QueueNavigator = () => <Text>My Queue</Text>;

  const FriendsNavigator = () => <Text>My Friends</Text>;

  return (
    <SafeArea>
      <MoviesContextProvider>
        <TvContextProvider>
          <PeopleContextProvider>
            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen name="Home" component={HomeNavigator} />
              <Tab.Screen name="Queue" component={QueueNavigator} />
              <Tab.Screen name="Friends" component={FriendsNavigator} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
          </PeopleContextProvider>
        </TvContextProvider>
      </MoviesContextProvider>
    </SafeArea>
  );
};
