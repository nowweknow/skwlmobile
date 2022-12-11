import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {getProducts, addProduct, searchProduct, searchProductForAuth, getSavedProducts, deleteProduct} from 'app/redux/reducers/marketplace/actionCreators';
import {IProducts} from 'types';

interface IState {
  products: IProducts[];
  isLoading: boolean;
  error: string | null;
  savedProducts: IProducts[];
}

const initialState: IState = {
  products: [],
  isLoading: false,
  error: null,
  savedProducts: [],
};

export const marketplaceSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    clearProducts(state) {
      state.products = [];
      state.isLoading = false;
    },
    clearSavedProducts(state) {
      state.savedProducts = [];
      state.isLoading = false;
    },
  },
  extraReducers: {
    [getProducts.pending.type]: state => {
      state.isLoading = true;
    },
    [getProducts.fulfilled.type]: (state, action: PayloadAction<IProducts[]>) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [getProducts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [addProduct.pending.type]: state => {
      state.isLoading = true;
    },
    [addProduct.fulfilled.type]: state => {
      state.isLoading = false;
    },
    [addProduct.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [searchProduct.pending.type]: state => {
      state.isLoading = true;
    },
    [searchProduct.fulfilled.type]: (state, action: PayloadAction<IProducts[]>) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [searchProduct.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [searchProductForAuth.pending.type]: state => {
      state.isLoading = true;
    },
    [searchProductForAuth.fulfilled.type]: (state, action: PayloadAction<IProducts[]>) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [searchProductForAuth.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [getSavedProducts.pending.type]: state => {
      state.isLoading = true;
    },
    [getSavedProducts.fulfilled.type]: (state, action: PayloadAction<IProducts[]>) => {
      state.savedProducts = action.payload;
      state.isLoading = false;
    },
    [getSavedProducts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [deleteProduct.pending.type]: state => {
      state.isLoading = true;
    },
    [deleteProduct.fulfilled.type]: state => {
      state.isLoading = false;
    },
    [deleteProduct.rejected.type]: state => {
      state.isLoading = false;
    },
  },
});
export const {clearProducts, clearSavedProducts} = marketplaceSlice.actions;
export default marketplaceSlice.reducer;
