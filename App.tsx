/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
// import type {PropsWithChildren} from 'react';

import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';

import ProfilePage from '@/pages/ProfilePage';
import CartPage from '@/pages/CartPage';
import NotificationsPage from '@/pages/NotificationsPage';
import LoginPage from '@/pages/LoginPage';
import NavigationLayout from '@/components/NavigationLayout';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '@/hooks/redux';
import {useGetCurrentUserQuery} from '@/redux/services/users.service';
import ProductDetails from '@/pages/ProductDetails';
import {UserTypes} from '@/constants/userType';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CheckoutPage from '@/pages/CheckoutPage';
import SplashScreen from 'react-native-splash-screen';
import Loading from '@/components/Loading';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet/';

export const AppWrapper = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <App />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const {isLoading} = useGetCurrentUserQuery(undefined);
  const user = useAppSelector(state => state.auth.user);

  React.useEffect(() => {
    SplashScreen.hide();
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading, user?.email]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        {!isLoading && user?.email && user?.role === UserTypes.CUSTOMER ? (
          <>
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
              <Stack.Screen name="Profile" component={ProfilePage} />
              <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{headerTitle: 'Product Details'}}
              />
              <Stack.Screen name="Checkout" component={CheckoutPage} />
              <Stack.Screen
                name="OrderDetails"
                component={CheckoutPage}
                options={{headerTitle: 'Order Details'}}
              />
            </Stack.Group>
          </>
        ) : (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="ForgotPassword" component={LoginPage} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
