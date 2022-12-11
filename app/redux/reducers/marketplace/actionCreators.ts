import {createAsyncThunk} from '@reduxjs/toolkit';

import {api} from 'app/api';
import {IProduct} from 'app/screens/publishPost';

export const getProducts = createAsyncThunk('marketplace/list', async (isLogged: true, thunkApi) => {
  try {
     const res = await api.getProducts(!isLogged);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const addProduct = createAsyncThunk('marketplace/create', async (product: IProduct, thunkApi) => {
  try {
    const res = await api.addProduct(product);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const searchProduct = createAsyncThunk('marketplace/search', async (keyword: string, thunkApi) => {
  try {
    const res = await api.searchProducts(keyword);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const searchProductForAuth = createAsyncThunk('marketplace/auth/search', async (keyword: string, thunkApi) => {
  try {
    const res = await api.searchProductsForAuth(keyword);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const updateSaveStatusProduct = createAsyncThunk('marketplace-saved/update', async (productId: number) => {
  try {
    const res = await api.updateSaveStatusProduct(productId);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const getSavedProducts = createAsyncThunk('marketplace-saved/products', async () => {
  try {
    const res = await api.getSavedProducts();
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const deleteProduct = createAsyncThunk('marketplace/delete', async (productId: number) => {
  try {
    const res = await api.deleteProduct(productId);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});
