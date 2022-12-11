import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const profile = {
  my: createSelector(
    (state: RootState) => state.profile.profile,
    (value) => value,
  ),
  isOnboardingSeen: createSelector(
    (state: RootState) => state.profile.isOnboardingSeen,
    (value) => value,
  ),
  notificationsSettings: createSelector(
    (state: RootState) => state.profile.notificationsSettings,
    (value) => value,
  ),
}
