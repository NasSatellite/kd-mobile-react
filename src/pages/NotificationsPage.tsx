import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PageContainer from '@/components/PageContainer';
const NotificationsPage = () => {
  return (
    <PageContainer>
      <View style={styles.container}>
        <View style={styles.noNotifications}>
          <Text>No Notifications</Text>
        </View>
      </View>
    </PageContainer>
  );
};
export default NotificationsPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  noNotifications: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
