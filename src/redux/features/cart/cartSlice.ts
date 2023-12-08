import {createSlice} from '@reduxjs/toolkit';

type CartState = {
  items: any[];
};
const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCart: (_, action) => {
      return {items: action.payload.data};
    },
  },
});

export const {setCart} = cartSlice.actions;

export default cartSlice.reducer;
