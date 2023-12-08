import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useGetOrdersQuery} from '@/redux/services/orders.service';
import PageContainer from '@/components/PageContainer';
import Loading from '@/components/Loading';
import {SharedStyles} from '@/styles/pages';
import {FlatList} from 'react-native';
import OrdersCard from '@/components/cards/OrdersCard';
import Separator from '@/components/Separator';
const OrdersPage = () => {
  const {data: orders, isLoading} = useGetOrdersQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <PageContainer>
      <Text style={SharedStyles.pageTitle}>My Orders</Text>
      <View>
        {!orders?.data?.length ? (
          <View style={styles.noOrders}>
            <Text>No Orders</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={orders?.data}
              ItemSeparatorComponent={() => <Separator />}
              renderItem={({item}) => <OrdersCard item={item} />}
            />
          </View>
        )}
      </View>
    </PageContainer>
  );
};
export default OrdersPage;

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 20,
  },

  noOrders: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
