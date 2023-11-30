import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, SafeAreaView} from 'react-native';
// import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppBar = () => {
  const navigator = useNavigation();
  return (
    <SafeAreaView>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: 10,
          paddingRight: 20,
        }}>
        <Ionicons
          name="notifications-outline"
          size={25}
          color="black"
          onPress={() => {
            navigator.navigate('Notification' as never);
          }}
        />
        <Ionicons
          name="cart-outline"
          size={25}
          color="black"
          onPress={() => {
            navigator.navigate('Cart' as never);
          }}
        />
        <Ionicons
          name="person-outline"
          size={25}
          color="black"
          onPress={() => {
            navigator.navigate('Profile' as never);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default AppBar;
