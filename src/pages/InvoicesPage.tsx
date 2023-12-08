import React from 'react';
import PageContainer from '@/components/PageContainer';
import {SharedStyles} from '@/styles/pages';
import {View, Text, StyleSheet} from 'react-native';
const InvoicesPage = () => {
  return (
    <PageContainer>
      <View>
        <Text style={SharedStyles.pageTitle}>My Invoices</Text>
        <View style={styles.noInvoices}>
          <Text>No Invoices</Text>
        </View>
      </View>
    </PageContainer>
  );
};
export default InvoicesPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  noInvoices: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
