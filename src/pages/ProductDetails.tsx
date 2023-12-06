import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

type Props = {
  route: any;
};
const ProductDetails = ({route}: Props) => {
  const {product_id} = route.params;
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Product id: {product_id}</Text>
      </View>
    </SafeAreaView>
  );
};
export default ProductDetails;
const styles = StyleSheet.create({
  container: {},
});
