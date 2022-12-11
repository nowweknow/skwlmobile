import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const auth = {
  isLogged: createSelector(
    (state: RootState) => state.auth.isLogged,
    (value) => value,
  ),
  error: createSelector(
    (state: RootState) => state.auth.error,
    (value) => value,
  ),
  token: createSelector(
    (state: RootState) => state.auth.token,
    (value) => value,
  ),
}
