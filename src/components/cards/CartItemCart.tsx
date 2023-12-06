import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type Props = {
  item: any;
};

const CartItem = ({item}: Props) => {
  return (
    <View style={styles.container}>
      {item?.product_id?.photo ? (
        <Image
          source={{uri: item?.product_id?.photo, width: 200, height: 200}}
        />
      ) : (
        <Text style={styles.noPhoto}>No Image</Text>
      )}
      <Text>{item?.name}</Text>
      <Text>{item?.product_id?.name}</Text>
    </View>
  );
};
export default CartItem;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  noPhoto: {
    width: 100,
    height: 100,
  },
});
