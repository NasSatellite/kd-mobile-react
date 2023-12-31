import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useGetWarehousesQuery} from '@/redux/services/warehouse.service';
import PageContainer from '@/components/PageContainer';
import {SharedStyles} from '@/styles/pages';
const WareHousesPage = () => {
  const {data: warehouses} = useGetWarehousesQuery(undefined);
  return (
    <PageContainer>
      <Text style={SharedStyles.pageTitle}>My Warehouses</Text>

      <View style={styles.container}>
        {!warehouses?.data?.length ? (
          <View>
            <Text>No warehouses</Text>
          </View>
        ) : (
          <View>
            {warehouses?.data?.map((warehouse: any) => {
              return (
                <View key={warehouse?._id} style={styles.addressContainer}>
                  <Text>{warehouse?.name}</Text>
                  <Text style={styles.smallText}>{warehouse?.address}</Text>
                </View>
              );
            })}
          </View>
        )}

        <Pressable style={[SharedStyles.primaryButton, styles.addWarehouse]}>
          <Text style={SharedStyles.primaryButtonText}>Add Warehouse</Text>
        </Pressable>
      </View>
    </PageContainer>
  );
};
export default WareHousesPage;
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '95%',
  },
  addressContainer: {
    marginVertical: 20,
  },
  smallText: {
    fontSize: 12,
  },

  addWarehouse: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
