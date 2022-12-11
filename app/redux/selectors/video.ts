import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const video = {
  isLoading: createSelector(
    (state: RootState) => state.video.isLoading,
    (value) => value,
  ),
  error: createSelector(
    (state: RootState) => state.video.error,
    (value) => value,
  ),
  didIPublishedNewVideo: createSelector(
    (state: RootState) => state.video.didIPublishedNewVideo,
    (value) => value,
  ),
}
