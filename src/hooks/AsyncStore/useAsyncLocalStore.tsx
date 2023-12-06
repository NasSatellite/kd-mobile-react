import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAsyncStoreData = async (key: string) => {
  const data = await AsyncStorage.getItem(key);
  return data;
};
const useAsyncLocalStore = (key: string) => {
  const [value, setValue] = React.useState<any>('');

  React.useEffect(() => {
    getAsyncStoreData(key).then(data => {
      setValue(data);
    });
  }, [key]);
  return [value, setValue] as const;
};

export default useAsyncLocalStore;
