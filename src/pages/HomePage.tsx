import React, {useCallback, useMemo, useRef} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Pressable} from 'react-native';
import {useAppSelector} from '@/hooks/redux';
import PageContainer from '@/components/PageContainer';
import {SharedStyles} from '@/styles/pages';
import {useGetOrdersQuery} from '@/redux/services/orders.service';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';

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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables;
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const user = useAppSelector(state => state.auth.user);

  const {data: orders, isLoading: isOrdersLoading} =
    useGetOrdersQuery(undefined);

  // const getPendingOrders = () => {
  //   if (orders) {
  //     return orders.data.filter((order: any) => order.status === 'pending')
  //       .length;
  //   }
  // };

  const getTotalOrders = () => {
    if (orders) {
      return orders.data.length;
    }
  };
  return (
    <SafeAreaView>
      <PageContainer>
        <Text style={SharedStyles.pageTitle}>
          Welcome {user?.name ?? user?.email}
        </Text>

        <View style={styles.cardsContainer}>
          <Card
            title="Total Orders"
            value={isOrdersLoading ? '...' : getTotalOrders()}
          />
          <Card
            title="Pending Orders"
            value={isOrdersLoading ? '...' : getTotalOrders()}
          />
          <Card title="Fulfilled Orders" value="0" />
          <Card title="Unpaid Invoices" value="0" />
        </View>
        {/* <Pressable
          style={SharedStyles.primaryButton}
          onPress={handlePresentModalPress}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Checkout</Text>
        </Pressable> */}
        <BottomSheetModal
          backdropComponent={(props: any) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
            />
          )}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View>
            <Text>Checkout</Text>
          </View>
        </BottomSheetModal>
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
