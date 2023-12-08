import React from 'react';
import {useLogoutMutation} from '@/redux/services/auth.service';
import {View, Text, Pressable} from 'react-native';
import PageContainer from '@/components/PageContainer';
import {SharedStyles} from '@/styles/pages';
import {useAppSelector} from '@/hooks/redux';
import {StyleSheet} from 'react-native';
const ProfilePage = () => {
  const [logout] = useLogoutMutation(undefined);
  const user = useAppSelector(state => {
    return state.auth.user;
  });

  return (
    <PageContainer>
      <Text style={SharedStyles.pageTitle}>My Profile</Text>
      <View style={styles.details}>
        <Text>Name: {user?.name} </Text>
        <Text>Email: {user?.email}</Text>
        <Text>Phone: {user?.phone}</Text>
        {/* <Text>{JSON.stringify(user)}</Text> */}
      </View>
      <Pressable
        onPress={async () => {
          await logout(null);
        }}
        style={SharedStyles.primaryButton}>
        <Text style={SharedStyles.primaryButtonText}>Logout</Text>
      </Pressable>
    </PageContainer>
  );
};
export default ProfilePage;

const styles = StyleSheet.create({
  details: {
    marginVertical: 20,
  },
});
