import React from 'react';
import {View, Text, TextInput} from 'react-native';
const LoginPage = () => {
  return (
    <View>
      <Text>LoginPage</Text>
      <View>
        <Text> Demo Form </Text>
        <View>
          <TextInput placeholder="Email" />
          <TextInput secureTextEntry={true} placeholder="Password" />
        </View>
      </View>
    </View>
  );
};
export default LoginPage;
