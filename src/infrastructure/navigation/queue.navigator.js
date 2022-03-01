import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { QueueScreen } from '../../features/queue/screens/queue.screen';

const QueueStack = createStackNavigator();

export const QueueNavigator = () => {
  return (
    <QueueStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <QueueStack.Screen
        options={{
          header: () => null,
        }}
        name="Queue"
        component={QueueScreen}
      />
    </QueueStack.Navigator>
  );
};
