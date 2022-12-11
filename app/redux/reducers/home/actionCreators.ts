import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from 'app/api';

export const getNewVideo = createAsyncThunk('video/new', async (page: number, thunkApi) => {
  try {
    const res = await api.getNewVideo(page);

    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});
export const getNewVideoAuth = createAsyncThunk('video/new/auth', async (page: number, thunkApi) => {
  try {
    const res = await api.getNewVideoAuth(page);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});
export const getTrendingVideo = createAsyncThunk('video/trending', async (page: number, thunkApi) => {
  try {
    const res = await api.getTrendingVideo(page);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const getTrendingVideoAuth = createAsyncThunk('video/trending/auth', async (page: number, thunkApi) => {
  try {
    const res = await api.getTrendingVideoAuth(page);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const likeVideo = createAsyncThunk('video/like', async (videoId: number, thunkApi) => {
  try {
    const res = await api.likeVideo(videoId);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const getFollowingVideo = createAsyncThunk('video/following', async (page: number, thunkApi) => {
  try {
    const res = await api.followingVideo(page);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const getRecommendedUsers = createAsyncThunk('users/auth/recommended', async (_, thunkApi) => {
  try {
    const res = await api.getRecommendedUsers();
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});

export const subscribeUser = createAsyncThunk('users/subscribe', async (userId: number, thunkApi) => {
  try {
    const res = await api.subscribeUser(userId);
    return res.data;
  } catch (e) {
    return thunkApi.rejectWithValue('something goes wrong');
  }
});
