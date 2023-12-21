import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SharedStyles} from '@/styles/pages';
import {useAppSelector} from '@/hooks/redux';
import {useAddToCartMutation} from '@/redux/services/cart.service';

type CardProps = {
  product_id: string;
  name: string;
  photo: string;
  price: number;
};
const ProductCard = ({product_id, name, photo, price}: CardProps) => {
  const cart = useAppSelector(
    (state: {cart: {items: any}}) => state.cart.items,
  );
  const isProuctInCart = cart.some(
    (item: {product_id: any}) => item.product_id?._id === product_id,
  );

  const [addToCart, {isLoading: isAddingToCart}] =
    useAddToCartMutation(undefined);

  return (
    <View style={styles.container}>
      {photo ? (
        <Image
          source={{uri: photo, width: 100, height: 100}}
          style={styles.productImage}
        />
      ) : (
        <Text style={styles.noPhoto}>No Image</Text>
      )}
      <Text style={styles.productName}>{name}</Text>
      <Text>
        <Text style={SharedStyles.nairaCurrency}>N</Text>
        {price}
      </Text>
      {isProuctInCart ? (
        <Text style={styles.addedToCart}>Added to cart</Text>
      ) : (
        <Pressable
          style={styles.addToCart}
          onPress={async () => {
            await addToCart({
              product_id,
              quantity: 1,
            });
          }}>
          {isAddingToCart ? (
            <Text style={styles.addToCartText}>...</Text>
          ) : (
            <Text style={styles.addToCartText}>Add to cart</Text>
          )}
        </Pressable>
      )}
    </View>
  );
};
export default ProductCard;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    width: 160,
    borderRadius: 10,
  },
  noPhoto: {
    width: 100,
    height: 100,
  },
  productImage: {
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
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
  addedToCart: {
    marginTop: 3,
    backgroundColor: 'grey',
    padding: 5,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
  },
});
