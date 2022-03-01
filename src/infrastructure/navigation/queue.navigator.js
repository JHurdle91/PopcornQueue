import React, { useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { FilterFab } from '../../features/queue/components/filter-fab.component';
import { MediaContext } from '../../services/media/media.context';
import { QueueScreen } from '../../features/queue/screens/queue.screen';
import { theme } from '../theme';

const QueueTabs = createMaterialTopTabNavigator();

export const QueueNavigator = ({ navigation }) => {
  const [typeFilter, setTypeFilter] = useState(null);
  const { STATUS } = useContext(MediaContext);

  const changeFilter = (f) => {
    setTypeFilter(f);
  };

  return (
    <>
      <QueueTabs.Navigator
        initialRouteName="QueueTab"
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}
      >
        <QueueTabs.Screen
          name="QueueTab"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? 'list' : 'list-outline'}
                size={24}
                color={
                  focused
                    ? theme.colors.brand.primary
                    : theme.colors.ui.secondary
                }
              />
            ),
          }}
          children={() => (
            <QueueScreen
              typeFilter={typeFilter}
              statusFilter={STATUS.queued}
              navigation={navigation}
            />
          )}
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
                  focused
                    ? theme.colors.brand.primary
                    : theme.colors.ui.secondary
                }
              />
            ),
          }}
          children={() => (
            <QueueScreen
              typeFilter={typeFilter}
              statusFilter={STATUS.good}
              navigation={navigation}
            />
          )}
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
                  focused
                    ? theme.colors.brand.primary
                    : theme.colors.ui.secondary
                }
              />
            ),
          }}
          children={() => (
            <QueueScreen
              typeFilter={typeFilter}
              statusFilter={STATUS.bad}
              navigation={navigation}
            />
          )}
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
          children={() => (
            <QueueScreen
              typeFilter={typeFilter}
              statusFilter={STATUS.ignore}
              navigation={navigation}
            />
          )}
        />
      </QueueTabs.Navigator>
      <FilterFab changeFilter={changeFilter} />
    </>
  );
};
