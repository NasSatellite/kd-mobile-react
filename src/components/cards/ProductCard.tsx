import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SharedStyles} from '@/styles/pages';

type CardProps = {
  product_id: string;
  name: string;
  photo: string;
  price: number;
};
const ProductCard = ({name, photo, price}: CardProps) => {
  return (
    <View style={styles.container}>
      {photo ? (
        <Image source={{uri: photo, width: 200, height: 200}} />
      ) : (
        <Text style={styles.noPhoto}>No Image</Text>
      )}
      <Text style={styles.productName}>{name}</Text>
      <Text>
        <Text style={SharedStyles.nairaCurrency}>N</Text>
        {price}
      </Text>
      <Pressable
        style={styles.addToCart}
        onPress={() => {
          console.log('add to cart');
        }}>
        <Text style={styles.addToCartText}>Add to cart</Text>
      </Pressable>
    </View>
  );
};
export default ProductCard;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    width: 160,
  },
  noPhoto: {
    width: 100,
    height: 100,
  },
  productName: {
    fontSize: 10,
  },
  addToCart: {
    marginTop: 3,
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
  },

  addToCartText: {
    color: 'white',
    textAlign: 'center',
  },
});
