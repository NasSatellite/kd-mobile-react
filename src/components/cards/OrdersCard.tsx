import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type CardProps = {
  item: any;
};
const OrdersCard = ({item}: CardProps) => {
  return (
    <View style={styles.container}>
      <Text>{item?.product?.name}</Text>
      <Text>{item?.quantity} cartons</Text>
      <Text>{item?.status ?? 'Pending'}</Text>
    </View>
  );
};
export default OrdersCard;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
