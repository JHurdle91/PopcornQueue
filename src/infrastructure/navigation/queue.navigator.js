import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { LikesScreen } from '../../features/queue/screens/likes.screen';
import { QueueScreen } from '../../features/queue/screens/queue.screen';
import { theme } from '../theme';

const QueueTabs = createMaterialTopTabNavigator();

export const QueueNavigator = () => {
  return (
    <QueueTabs.Navigator initialRouteName="QueueTab">
      <QueueTabs.Screen
        name="QueueTab"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'list' : 'list-outline'}
              size={24}
              color={
                focused ? theme.colors.brand.primary : theme.colors.ui.secondary
              }
            />
          ),
        }}
        component={QueueScreen}
      />
      <QueueTabs.Screen
        name="LikesTab"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'thumbs-up' : 'thumbs-up-outline'}
              size={24}
              color={
                focused ? theme.colors.brand.primary : theme.colors.ui.secondary
              }
            />
          ),
        }}
        component={LikesScreen}
      />
      <QueueTabs.Screen
        name="DislikesTab"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'thumbs-down' : 'thumbs-down-outline'}
              size={24}
              color={
                focused ? theme.colors.brand.primary : theme.colors.ui.secondary
              }
            />
          ),
        }}
        component={QueueScreen}
      />
      <QueueTabs.Screen
        name="IgnoreTab"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'md-remove-circle' : 'md-remove-circle-outline'}
              size={24}
              color={
                focused ? theme.colors.ui.error : theme.colors.ui.secondary
              }
            />
          ),
        }}
        component={QueueScreen}
      />
    </QueueTabs.Navigator>
  );
};
