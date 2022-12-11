import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  getFollowingVideo,
  getNewVideo,
  getNewVideoAuth,
  getRecommendedUsers,
  getTrendingVideo,
  getTrendingVideoAuth,
  likeVideo,
  subscribeUser,
} from 'app/redux/reducers/home/actionCreators';
import {ILikesResponse, ISubscriptionResponse, IVideoResponse} from 'types';
import {VIDEO_LINK_PATTERN} from 'variables';

interface IState {
  videos: IVideoResponse[] | null;
  error: string | null;
  likePending: boolean;
  isLoading: boolean;
  isVideosLoaded: boolean;
  recommendedUsers: Array<IVideoResponse> | null;
  subscriptions: Array<ISubscriptionResponse> | [];
}

const initialState: IState = {
  videos: null,
  error: null,
  likePending: false,
  isLoading: false,
  isVideosLoaded: false,
  recommendedUsers: null,
  subscriptions: [],
};

export const homeSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    clearVideos(state) {
      state.videos = [];
      state.isVideosLoaded = false;
    },
    setVideos(state, {payload}: PayloadAction<IVideoResponse[] | null>) {
      state.videos = payload;
    },
  },
  extraReducers: {
    [getNewVideo.pending.type]: state => {
      state.isLoading = true;
    },
    [getNewVideo.fulfilled.type]: (
      state,
      action: PayloadAction<IVideoResponse[]>,
    ) => {
      state.videos = [
        ...(state.videos ? state.videos : []),
        ...action.payload.filter(video => video.link.match(VIDEO_LINK_PATTERN)),
      ];
      state.isLoading = false;
    },
    [getNewVideo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [getNewVideoAuth.pending.type]: state => {
      state.isLoading = true;
    },
    [getNewVideoAuth.fulfilled.type]: (
      state,
      action: PayloadAction<IVideoResponse[]>,
    ) => {
      state.videos = [
        ...(state.videos ? state.videos : []),
        ...action.payload.filter(video => video.link.match(VIDEO_LINK_PATTERN)),
      ];
      state.isLoading = false;
    },
    [getNewVideoAuth.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [getTrendingVideo.pending.type]: state => {
      state.isLoading = true;
    },
    [getTrendingVideo.fulfilled.type]: (
      state,
      action: PayloadAction<IVideoResponse[]>,
    ) => {
      state.videos = [
        ...(state.videos ? state.videos : []),
        ...action.payload.filter(video => video.link.match(VIDEO_LINK_PATTERN)),
      ];
      state.isLoading = false;
    },
    [getTrendingVideo.rejected.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [getTrendingVideoAuth.pending.type]: state => {
      state.isLoading = false;
    },
    [getTrendingVideoAuth.fulfilled.type]: (
      state,
      action: PayloadAction<IVideoResponse[]>,
    ) => {
      state.videos = [
        ...(state.videos ? state.videos : []),
        ...action.payload.filter(video => video.link.match(VIDEO_LINK_PATTERN)),
      ];
      state.isLoading = false;
    },
    [getTrendingVideoAuth.rejected.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [likeVideo.pending.type]: state => {
      state.likePending = true;
    },
    [likeVideo.fulfilled.type]: (
      state,
      action: PayloadAction<ILikesResponse>,
    ) => {
      state.videos =
        state.videos &&
        state.videos.map((video: IVideoResponse) => {
          if (video.id === action.payload.videoId) {
            return {
              ...video,
              user_liked: video.user_liked.length ? [] : [{id: 1}],
            };
          }
          return video;
        });

      state.likePending = false;
    },
    [likeVideo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.likePending = false;
    },
    [getFollowingVideo.pending.type]: state => {
      state.isLoading = true;
    },
    [getFollowingVideo.fulfilled.type]: (
      state,
      action: PayloadAction<IVideoResponse[]>,
    ) => {
      state.videos = [
        ...(state.videos ? state.videos : []),
        ...action.payload.filter(video => video.link.match(VIDEO_LINK_PATTERN)),
      ];
      state.isLoading = false;
      state.isVideosLoaded = true;
    },
    [getFollowingVideo.rejected.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isVideosLoaded = true;
    },
    [getRecommendedUsers.pending.type]: state => {
      state.isLoading = true;
    },
    [getRecommendedUsers.fulfilled.type]: (
      state,
      action: PayloadAction<IVideoResponse[]>,
    ) => {
      state.recommendedUsers = action.payload;
      state.isLoading = false;
    },
    [getRecommendedUsers.rejected.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [subscribeUser.pending.type]: state => {
      state.isLoading = true;
    },
    [subscribeUser.fulfilled.type]: (
      state,
      action: {payload: ISubscriptionResponse},
    ) => {
      state.isLoading = false;
      const hasSubscribed = !!state.subscriptions.find(
        item => item.userId === action.payload.userId,
      );

      state.subscriptions =
        action.payload.id && !hasSubscribed
          ? [...state.subscriptions, action.payload]
          : state.subscriptions.filter(
              (sub: ISubscriptionResponse) =>
                sub.userId !== action.payload.userId,
            );
    },

    [subscribeUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
export const {clearVideos, setVideos} = homeSlice.actions;
export default homeSlice.reducer;
