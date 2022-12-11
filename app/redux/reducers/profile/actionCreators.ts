import {createAsyncThunk} from '@reduxjs/toolkit';

import {api} from 'app/api';
import {IProfile, IUser} from 'app/types';

export const profile = createAsyncThunk('users/profile', async (_, thunkApi) => {
  try {
    const res = await api.profile();
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const profileForAuth = createAsyncThunk('users/profile', async (userId: string, thunkApi) => {
  try {
    const res = await api.profileForAuth(userId);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const updateProfile = createAsyncThunk('users/update', async (user: IUser, thunkApi) => {
  try {
    const res = await api.updateProfile(user);
    return res.json();
  } catch (e) {
    console.log(e)
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const getNotificationsSettings = createAsyncThunk('notification-settings', async (_, thunkApi) => {
  try {
    const res = await api.getNotificationsSettings();
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});
