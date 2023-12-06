import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {useAppSelector} from '@/hooks/redux';
import PageContainer from '@/components/PageContainer';
import {SharedStyles} from '@/styles/pages';
// import useAsyncLocalStore from '@/hooks/AsyncStore/useAsyncLocalStore';

type CardProps = {
  title: string;
  value: string;
};
const Card = ({title, value}: CardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.card_title}>{title}</Text>
      <Text style={styles.card_value}>{value}</Text>
    </View>
  );
};

const HomePage = () => {
  const user = useAppSelector(state => state.auth.user);
  return (
    <SafeAreaView>
      <PageContainer>
        <Text style={SharedStyles.pageTitle}>
          Welcome {user?.name ?? user?.email}
        </Text>

        <View style={styles.cardsContainer}>
          <Card title="Pending Orders" value="0" />
          <Card title="Revenue This Month" value="0" />
          <Card title="Inventory" value="0" />
          <Card title="Total Orders" value="0" />
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },

  card: {
    padding: 10,
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  card_title: {
    fontSize: 11,
  },

  card_value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default HomePage;
