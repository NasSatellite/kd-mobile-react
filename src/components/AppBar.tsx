import React from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTypedNavigation} from '@/hooks/navigator/typedNavigationHook';
import {useGetCartQuery} from '@/redux/services/cart.service';

const AppBar = () => {
  const navigator = useTypedNavigation();
  const {data: cartItems, isLoading: isCartLoading} =
    useGetCartQuery(undefined);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Ionicons
          name="notifications-outline"
          size={25}
          color="black"
          onPress={() => {
            navigator.navigate('Notification');
          }}
        />

        <View style={styles.cartContainer}>
          <Ionicons
            name="cart-outline"
            size={25}
            color="black"
            onPress={() => {
              navigator.navigate('Cart');
            }}
          />
          <Text style={styles.cartCount}>
            {isCartLoading ? '...' : cartItems?.data?.length ?? 0}
          </Text>
        </View>

        <Ionicons
          name="person-outline"
          size={25}
          color="black"
          onPress={() => {
            navigator.navigate('Profile');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default AppBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    paddingRight: 20,
  },
  cartContainer: {
    position: 'relative',
  },
  cartCount: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: 'red',
    color: 'white',
    padding: 2,
    paddingHorizontal: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 7,
    borderRadius: 100,
  },
});
