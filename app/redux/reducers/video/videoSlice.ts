import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getFollowingVideo, deleteVideo } from 'app/redux/reducers/video';
import { IVideoResponse } from 'app/types';
import {getLikedVideo, postVideo} from './actionCreators';

interface IState {
  videoFollowing: IVideoResponse[] | null;
  isLoading: boolean;
  error: string | null;
  didIPublishedNewVideo: boolean;
  likedVideo: IVideoResponse[] | null
  likedVideosIds: number[] | null
}

const initialState: IState = {
  videoFollowing: [],
  isLoading: false,
  error: null,
  didIPublishedNewVideo: false,
  likedVideo: null,
  likedVideosIds: null,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    clearFollowingVideo(state) {
      state.videoFollowing = [];
      state.isLoading = false;
    },
    setDidIPublishedNewVideo(state, { payload }: PayloadAction<boolean>) {
      state.didIPublishedNewVideo = payload
    },
    setLikedVideosIds(state, { payload }: PayloadAction<number[] | null>) {
      state.likedVideosIds = payload
    },
  },
  extraReducers: {
    [getLikedVideo.pending.type]: state => {
      state.isLoading = true;
    },
    [getLikedVideo.fulfilled.type]: (state, action: PayloadAction<{ videoId: number; video: IVideoResponse}[]>) => {
      state.likedVideo = action.payload;
      state.isLoading = false;
      state.likedVideosIds = action.payload.map( i => i.videoId)
    },
    [getLikedVideo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [getFollowingVideo.pending.type]: state => {
      state.isLoading = true;
    },
    [getFollowingVideo.fulfilled.type]: (state, action: PayloadAction<IVideoResponse[]>) => {
      state.videoFollowing = action.payload;
      state.isLoading = false;
    },
    [getFollowingVideo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [postVideo.pending.type]: state => {
      state.isLoading = true;
    },
    [postVideo.fulfilled.type]: (state, action: PayloadAction<boolean>) => {
      state.didIPublishedNewVideo = action.payload
      state.isLoading = false;
    },
    [postVideo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [deleteVideo.pending.type]: state => {
      state.isLoading = true;
    },
    [deleteVideo.fulfilled.type]: state => {
      state.isLoading = false;
    },
    [deleteVideo.rejected.type]: state => {
      state.isLoading = false;
    },
  },
});
export const {
  clearFollowingVideo,
  setDidIPublishedNewVideo,
  setLikedVideosIds,
} = videoSlice.actions;
export default videoSlice.reducer;
