import {REACT_APP_STAGING_UR,REACT_APP_TEST_URL} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {api, getToken} from 'app/api';
import {ICompletedNewVideoData} from 'app/screens/publishPost';
import {setProfile} from '../profile/profileSlice';

export const getFollowingVideo = createAsyncThunk(
  'video/following',
  async (_, thunkApi) => {
    try {
      const res = await api.getFollowingVideo();
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(`something goes wrong: "${e.message}"`);
    }
  },
);
export const getLikedVideo = createAsyncThunk(
  'video/liked',
  async (_, thunkApi) => {
    try {
      const res = await api.getLikedVideo();
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(`something goes wrong: "${e.message}"`);
    }
  },
);

export const postVideo = createAsyncThunk(
  'video',
  async (data: ICompletedNewVideoData, thunkApi) => {
    try {
      const res = await api.postVideo(data);
      const profileRes = await fetch(`${REACT_APP_TEST_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const profile = await profileRes.json();
      thunkApi.dispatch(setProfile({...profile}));
      return res.status === 201;
    } catch (e) {
      return thunkApi.rejectWithValue(`something goes wrong: "${e.message}"`);
    }
  },
);

export const deleteVideo = createAsyncThunk(
  'video/delete',
  async (id: number, thunkApi) => {
    try {
      const res = await api.deleteVideo(id);
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(`something goes wrong: "${e.message}"`);
    }
  },
);
