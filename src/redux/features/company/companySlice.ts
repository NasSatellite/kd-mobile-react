import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface companyState {
  _id?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  logo_url?: string | null;
}

const initialState: companyState = {
  _id: null,
  name: null,
  email: null,
  phone: null,
  country: null,
  logo_url: null,
};

export const companySlice = createSlice({
  name: 'company',
  initialState: initialState,

  reducers: {
    setCompany: (state, action: PayloadAction<companyState>) => {
      const company = action.payload;

      state = {...Object.assign(state, company)};
    },
  },
});

export const {setCompany} = companySlice.actions;
export default companySlice.reducer;
