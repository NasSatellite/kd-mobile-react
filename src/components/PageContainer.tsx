import React from 'react';
import {StyleSheet, View} from 'react-native';
type pageProps = {
  children: React.ReactNode;
};
const PageContainer = ({children}: pageProps) => {
  return <View style={styles.container}>{children}</View>;
};

export default PageContainer;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
