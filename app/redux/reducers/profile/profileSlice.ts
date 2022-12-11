import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { profile, updateProfile } from 'app/redux/reducers/profile';
import { INotificationsSettings, IProfile } from 'types';
import { getNotificationsSettings } from './actionCreators';

interface IState {
  profile: IProfile | null;
  isLoading: boolean;
  error: string | null;
  isOnboardingSeen: boolean
  notificationsSettings: null | INotificationsSettings
}

const initialState: IState = {
  profile: null,
  isLoading: false,
  error: null,
  isOnboardingSeen: false,
  notificationsSettings: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
      state.isLoading = false;
    },
    setProfile(state, { payload }: PayloadAction<IProfile | null>) {
      state.profile = payload ? { ...payload } : payload
    },
    setIsOnboardingSeen(state, { payload }: PayloadAction<boolean>) {
      state.isOnboardingSeen = payload
    },
    setNotificationsSettings(state, { payload }: PayloadAction<INotificationsSettings>) {
      state.notificationsSettings = payload
    },
  },
  extraReducers: {
    [profile.pending.type]: state => {
      state.isLoading = true;
    },
    [profile.fulfilled.type]: (state, action: PayloadAction<IProfile>) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    [profile.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [updateProfile.pending.type]: state => {
      state.isLoading = true;
    },
    [updateProfile.fulfilled.type]: state => {
      state.isLoading = false;
    },
    [updateProfile.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [getNotificationsSettings.fulfilled.type]: (state, action: PayloadAction<INotificationsSettings>) => {
      state.notificationsSettings = action.payload;
    },
  },
});
export const { clearProfile, setProfile, setIsOnboardingSeen, setNotificationsSettings } = profileSlice.actions;
export default profileSlice.reducer;
