import React, {useEffect} from 'react';
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
import {useUpdateCartMutation} from '@/redux/services/cart.service';
// import {Modal} from 'react-native-paper';

type Props = {
  item: any;
};

const CartItem = ({item}: Props) => {
  const [quantity, setQuantity] = React.useState<number>(item?.quantity ?? 1);
  const firstRender = React.useRef(true);

  const [updateCartItem, {isLoading: isUpdating}] =
    useUpdateCartMutation(undefined);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (quantity === 0) {
      return;
    }

    const timeout = setTimeout(() => {
      updateCartItem({
        id: item?._id,
        quantity,
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [quantity, updateCartItem, item?._id]);

  const productTotal = () =>
    item?.product_id?.unit_price * item?.product_id?.pieces_per_package;

  const handleRemoveItem = async () => {};

  const handleQuantityChange = async (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity((prev: number) => prev + 1);
    }

    if (action === 'decrease') {
      setQuantity((prev: number) => (prev === 1 ? prev : prev - 1));
    }
  };
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem()}>
        <AntDesign name="delete" size={20} color="black" />
      </TouchableOpacity>
      {/* <Modal style={styles.modal} visible={showDeleteModal}>
        <Text>You Are about to delete this cart Item. Are you sure?</Text>
      </Modal> */}
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
                disabled={quantity <= 1 || isUpdating}
                onPress={async () => await handleQuantityChange('decrease')}>
                <Text
                  style={[
                    styles.buttonToggleText,
                    // eslint-disable-next-line react-native/no-inline-styles
                  ]}>
                  <AntDesign
                    name="minus"
                    size={20}
                    color={quantity <= 1 ? 'lightgray' : 'black'}
                  />
                </Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantityField}
                defaultValue={quantity.toString()}
                keyboardType="numeric"
                onChange={e =>
                  setQuantity(prev =>
                    prev <= 1 ? 1 : Number(e.nativeEvent.text),
                  )
                }
              />
              <TouchableOpacity
                onPress={async () => await handleQuantityChange('increase')}>
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
    </View>
  );
};
export default CartItem;
const styles = StyleSheet.create({
  removeButton: {
    padding: 5,
    borderRadius: 5,
    width: 30,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  outerContainer: {
    backgroundColor: 'white',
  },
  container: {
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
