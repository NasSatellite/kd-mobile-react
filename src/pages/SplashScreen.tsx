import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const SplashScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.heading}>NASCO KD APP</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
export default SplashScreen;
