import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <Text>Loading...</Text>
    </View>
  );
};
export default Loading;
const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
