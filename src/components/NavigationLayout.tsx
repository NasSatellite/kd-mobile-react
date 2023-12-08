import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProductsPage from '@/pages/ProductsPage';
import OrdersPage from '@/pages/OrdersPage';

import FeatherIcons from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Oticon from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InvoicesPage from '@/pages/InvoicesPage';
import HomePage from '@/pages/HomePage';
import AppBar from './AppBar';
import WareHousesPage from '@/pages/WareHousesPage';

// import { View, Text } from 'react-native'

const Tab = createBottomTabNavigator();

const NavigationLayout = () => {
  const IconSize = 24;
  return (
    <React.Fragment>
      <AppBar />

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarStyle: {height: 60, shadowColor: 'none', elevation: 0},
          tabBarIconStyle: {
            color: 'white',
          },
          tabBarItemStyle: {
            paddingBottom: 5,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <Ionicons
                name="home-outline"
                size={IconSize}
                color={focused ? 'black' : '#bdbdbd'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Products"
          component={ProductsPage}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <FeatherIcons
                name="package"
                size={IconSize}
                color={focused ? 'black' : '#bdbdbd'}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Orders"
          component={OrdersPage}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <Oticon
                name="list-ordered"
                size={IconSize}
                color={focused ? 'black' : '#bdbdbd'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Invoices"
          component={InvoicesPage}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <AntIcon
                name="filetext1"
                size={IconSize}
                color={focused ? 'black' : '#bdbdbd'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Warehouses"
          component={WareHousesPage}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <FeatherIcons
                name="settings"
                size={IconSize}
                color={focused ? 'black' : '#bdbdbd'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};
export default NavigationLayout;
