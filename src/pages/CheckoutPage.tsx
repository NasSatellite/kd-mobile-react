import React from 'react';
import PageContainer from '@/components/PageContainer';
import {NairaSign} from '@/constants/symbols';
import {getTotalAmount} from '@/helpers/cartHelper';
import {formatAmount} from '@/helpers/formatAmount';
import {useTypedNavigation} from '@/hooks/navigator/typedNavigationHook';
import {useAppSelector} from '@/hooks/redux';
import {useGetWarehousesQuery} from '@/redux/services/warehouse.service';
import {SharedStyles} from '@/styles/pages';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useCheckoutMutation} from '@/redux/services/cart.service';
const CheckoutPage = () => {
  const cart = useAppSelector(state => state.cart.items);
  const navigator = useTypedNavigation();
  const {data: warehouses} = useGetWarehousesQuery(undefined);
  const [checkout, {isLoading}] = useCheckoutMutation(undefined);
  const [address, setAddress] = React.useState('');
  return (
    <PageContainer>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <Text style={SharedStyles.pageTitle}>Order Summary</Text>
            {cart?.map(item => (
              <View key={item?.product_id?._id}>
                <Text>
                  {item?.product_id?.name} x {item?.quantity}
                </Text>
              </View>
            ))}
            <Text style={SharedStyles.boldText}>
              Total: {NairaSign}
              {formatAmount(getTotalAmount(cart))}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={SharedStyles.pageTitle}>Delivery Address</Text>
            {/* <Text>{JSON.stringify(warehouses)}</Text> */}
            <Text>Select a delivery address</Text>
            <View style={styles.addressContainer}>
              {warehouses?.data?.map((item: any) => (
                <Pressable
                  key={item?._id}
                  style={[
                    styles.addressItemContainer,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      borderColor:
                        address === item?._id ? 'black' : 'lightgray',
                      borderWidth: address === item?._id ? 2 : 1,
                    },
                  ]}
                  onPress={() => setAddress(item?._id)}>
                  <Text>{item?.name}</Text>
                  <Text style={styles.locationAddress}>{item?.address}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>

        <Pressable
          style={SharedStyles.primaryButton}
          onPress={async () => {
            await checkout({
              warehouse_id: address,
            });
            navigator.navigate('Home');
          }}>
          <Text style={styles.confirmText}>Confirm Order</Text>
        </Pressable>
      </View>
    </PageContainer>
  );
};
export default CheckoutPage;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '100%',
  },

  section: {
    padding: 20,
    backgroundColor: 'white',
  },
  confirmText: {
    color: 'white',
    textAlign: 'center',
  },

  addressItemContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
  },

  addressContainer: {
    gap: 10,
  },

  locationAddress: {
    fontSize: 10,
  },
});
