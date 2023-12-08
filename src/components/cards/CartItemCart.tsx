import React from 'react';
import {
  Image,
  // Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NairaSign} from '@/constants/symbols';
import {formatAmount} from '@/helpers/formatAmount';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  item: any;
};

const CartItem = ({item}: Props) => {
  const [quantity, setQuantity] = React.useState(item?.quantity ?? 1);

  const productTotal = () =>
    item?.product_id?.unit_price * item?.product_id?.pieces_per_package;
  const handleIncreaseQuantity = () => {
    setQuantity((prev: number) => prev + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev: number) => prev - 1);
    }
  };
  return (
    <View style={styles.container}>
      {item?.product_id?.image_url ? (
        <Image
          source={{uri: item?.product_id?.image_url, width: 100, height: 150}}
        />
      ) : (
        <Text style={styles.noPhoto}>No Image</Text>
      )}
      <View style={styles.infoContainer}>
        <View>
          <Text>{item?.name}</Text>
          <Text>{item?.product_id?.name}</Text>
          <View>
            <Text>
              {NairaSign}
              {formatAmount(productTotal())} per packaging
            </Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonToggleContainer}>
            <TouchableOpacity
              disabled={quantity === 1}
              onPress={handleDecreaseQuantity}>
              <Text
                style={[
                  styles.buttonToggleText,
                  // eslint-disable-next-line react-native/no-inline-styles
                ]}>
                <AntDesign
                  name="minus"
                  size={20}
                  color={quantity === 1 ? 'lightgray' : 'black'}
                />
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.quantityField}
              defaultValue={quantity.toString()}
            />
            <TouchableOpacity onPress={handleIncreaseQuantity}>
              <Text style={styles.buttonToggleText}>
                <AntDesign name="plus" size={20} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.itemAmount}>
              {NairaSign}
              {formatAmount(productTotal() * quantity)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CartItem;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 10,
  },
  noPhoto: {
    width: 100,
    height: 150,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    justifyContent: 'space-between',
  },

  infoContainer: {
    justifyContent: 'space-between',
  },

  buttonToggleContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  buttonToggleText: {
    padding: 5,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    color: 'white',
  },
  quantityField: {
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  itemAmount: {
    textAlign: 'right',
  },
  increaseButton: {},
  decreaseButton: {},
  editButton: {},
  deleteButton: {},
});
