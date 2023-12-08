import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PageContainer from '@/components/PageContainer';
import {SharedStyles} from '@/styles/pages';
import {useGetProductsQuery} from '@/redux/services/product.service';
import {StyleSheet} from 'react-native';
import ProductCard from '@/components/cards/ProductCard';
import {useTypedNavigation} from '@/hooks/navigator/typedNavigationHook';
import Loading from '@/components/Loading';

const ProductsPage = ({}) => {
  const navigator = useTypedNavigation();
  const {data: products, isLoading} = useGetProductsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <PageContainer>
        <Text style={SharedStyles.pageTitle}>Products</Text>
        <View>
          {!products?.data?.length ? (
            <View style={styles.noProductView}>
              <Text>No Products</Text>
            </View>
          ) : (
            <View style={styles.productsContainer}>
              <FlatList
                data={products?.data}
                numColumns={2}
                // style={styles.productsContainer}
                // contentContainerStyle={styles.productsContainer}
                ItemSeparatorComponent={() => <Seperator />}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    // style={styles.container}
                    onPress={() =>
                      navigator.navigate('ProductDetails', {
                        product_id: item?._id,
                      })
                    }>
                    <View style={index % 2 === 0 ? {} : styles.marginLeft}>
                      <ProductCard
                        product_id={item?._id}
                        name={item?.name}
                        photo={item?.image_url}
                        price={item?.price ?? item?.unit_price}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const Seperator = () => {
  return <View style={styles.separator} />;
};

export default ProductsPage;
const styles = StyleSheet.create({
  noProductView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '70%',
  },

  productsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  marginLeft: {
    marginLeft: 10,
  },

  separator: {
    height: 10,
  },
});
