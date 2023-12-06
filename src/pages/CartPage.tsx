import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {useGetCartQuery} from '@/redux/services/cart.service';
// import PageContainer from '@/components/PageContainer';
import {SharedStyles} from '@/styles/pages';
import CartItem from '@/components/cards/CartItemCart';
import BottomSheet from '@gorhom/bottom-sheet';

const CartPage = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const {data: cartItems, isLoading} = useGetCartQuery(undefined);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BottomSheet
        onChange={handleSheetChanges}
        ref={bottomSheetRef}
        snapPoints={snapPoints}>
        <Text>Checkout</Text>
      </BottomSheet>
      {!cartItems?.data?.length ? (
        <View style={styles.noProductView}>
          <Text>Nothing in your cart</Text>
        </View>
      ) : (
        <View style={styles.productsContainer}>
          <FlatList
            data={cartItems?.data}
            ItemSeparatorComponent={() => <Seperator />}
            renderItem={({item}) => <CartItem item={item} />}
          />
        </View>
      )}
      <View style={styles.checkoutContainer}>
        <Text>Total: N200,000</Text>
        <Pressable style={SharedStyles.primaryButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
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

  productsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  marginLeft: {
    marginLeft: 10,
  },

  separator: {
    height: 10,
  },

  checkoutText: {
    color: 'white',
  },

  checkoutContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
});
