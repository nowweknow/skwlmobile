import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'

import authReducer from 'app/redux/reducers/auth/authSlice';
import homeReducer from 'app/redux/reducers/home/homeSlice';
import marketplaceReduces from 'app/redux/reducers/marketplace/marketplaceSlice';
import profileReducers from 'app/redux/reducers/profile/profileSlice';
import videoReducers from 'app/redux/reducers/video/videoSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


const persistRootConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['home', 'video',],
  // whitelist: ['login', 'user'] - list of the reducers should be whitelisted
}

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  marketplace: marketplaceReduces,
  profile: profileReducers,
  video: videoReducers,
});

const persistedRootReducer = persistReducer(persistRootConfig, rootReducer)

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store)

export const setupStore = () => {
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;