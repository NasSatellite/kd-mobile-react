import React from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {
  useClearCartMutation,
  useGetCartQuery,
} from '@/redux/services/cart.service';
import {SharedStyles} from '@/styles/pages';
import CartItem from '@/components/cards/CartItemCart';
import {useTypedNavigation} from '@/hooks/navigator/typedNavigationHook';
import {formatAmount} from '@/helpers/formatAmount';
import {NairaSign} from '@/constants/symbols';
import Loading from '@/components/Loading';
import {getTotalAmount} from '@/helpers/cartHelper';

const CartPage = () => {
  const {data: cartItems, isLoading} = useGetCartQuery(undefined);
  const [clearCart, {isLoading: isClearingCart}] =
    useClearCartMutation(undefined);
  const navigator = useTypedNavigation();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      {!cartItems?.data?.length ? (
        <View style={styles.noProductView}>
          <Text>Nothing in your cart</Text>
        </View>
      ) : (
        <View style={styles.productsContainer}>
          <View style={styles.header}>
            <Text style={SharedStyles.boldText}>
              {cartItems?.data?.length} Items
            </Text>
            <Pressable
              style={SharedStyles.primaryButton}
              onPress={async () => clearCart({})}
              disabled={isClearingCart}>
              <Text style={styles.clearCart}>
                {isClearingCart ? '...' : 'Clear Cart'}
              </Text>
            </Pressable>
          </View>
          <FlatList
            data={cartItems?.data}
            style={{maxHeight: 470}}
            contentContainerStyle={styles.itemsContainer}
            ItemSeparatorComponent={() => <Seperator />}
            renderItem={({item}) => <CartItem item={item} />}
          />
        </View>
      )}
      <View style={styles.checkoutContainer}>
        <Text style={SharedStyles.pageTitle}>Order Summary</Text>
        <View style={styles.amountItem}>
          <Text>Subtotal:</Text>
          <Text>
            {' '}
            {NairaSign}
            {formatAmount(getTotalAmount(cartItems?.data))}
          </Text>
        </View>
        <View style={styles.amountItem}>
          <Text>Discount:</Text>
          <Text>{NairaSign}0</Text>
        </View>
        <View style={styles.amountItem}>
          <Text style={SharedStyles.boldText}>Total:</Text>
          <Text style={SharedStyles.boldText}>
            {NairaSign}
            {formatAmount(getTotalAmount(cartItems?.data))}
          </Text>
        </View>
        <Pressable
          style={SharedStyles.primaryButton}
          onPress={() => {
            if (!cartItems?.data?.length) {
              return navigator.navigate('Products');
            }
            navigator.navigate('Checkout');
          }}>
          <Text style={styles.checkoutText}>
            {!cartItems?.data?.length ? 'Add Items' : 'Checkout'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
export default CartPage;

const Seperator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  noProductView: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '70%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },

  productsContainer: {
    padding: 10,
  },

  marginLeft: {
    marginLeft: 10,
  },

  separator: {
    height: 10,
  },

  checkoutText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },

  checkoutContainer: {
    backgroundColor: 'white',
    padding: 15,
    gap: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: '#000',
    shadowRadius: 5,
  },

  amountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  orderSummary: {
    fontWeight: 'bold',
  },

  clearCart: {
    color: 'white',
    textAlign: 'center',
    fontSize: 9,
  },

  itemsContainer: {},
});
