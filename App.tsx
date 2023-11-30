/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import type {PropsWithChildren} from 'react';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// import {FaInstagram} from 'react-icons/fa';

import {Provider} from 'react-redux';
import {store} from './src/redux/redux/store';
import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import ProductsPage from '@/pages/ProductsPage';
// import OrdersPage from '@/pages/OrdersPage';
import ProfilePage from '@/pages/ProfilePage';

// import FeatherIcons from 'react-native-vector-icons/Feather';
// import AntIcon from 'react-native-vector-icons/AntDesign';
// import Oticon from 'react-native-vector-icons/Octicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import InvoicesPage from '@/pages/InvoicesPage';
// import AppBar from '@/components/AppBar';
// import HomePage from '@/pages/HomePage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationLayout from '@/components/NavigationLayout';
import NotificationsPage from '@/pages/NotificationsPage';
import CartPage from '@/pages/CartPage';
import LoginPage from '@/pages/LoginPage';

export const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  // const user = useAppSelector(state => state.auth.user);
  // const IconSize = 24;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen
          name="App"
          component={NavigationLayout}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Group>
          <Stack.Screen name="Cart" component={CartPage} />
          <Stack.Screen name="Notification" component={NotificationsPage} />
          <Stack.Screen name="User" component={ProfilePage} />
        </Stack.Group>
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="ForgotPassword" component={ProfilePage} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({});

export default App;
