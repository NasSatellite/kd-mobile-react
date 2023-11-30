import {useTypedNavigation} from '@/hooks/navigator/typedNavigationHook';
import React from 'react';
import {View, Text, Button} from 'react-native';
const ProfilePage = () => {
  const navigator = useTypedNavigation();
  return (
    <View>
      <Text>ProfilePage</Text>
      <Button
        title="Logout"
        onPress={() => {
          navigator.navigate('Login');
        }}
      />
    </View>
  );
};
export default ProfilePage;
