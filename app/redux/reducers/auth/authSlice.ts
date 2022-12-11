import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User as IGoogleUser} from '@react-native-google-signin/google-signin';
import {AccessToken} from 'react-native-fbsdk-next';

import {
  authorization,
  signInWithFacebook,
  signInWithGoogle,
  signUpWithApple,
  signInWithApple,
  signUpWithFacebook,
  signUpWithGoogle,
} from 'app/redux/reducers/auth/actionCreators';

interface IState {
  token: string | null;
  isLogged: boolean;
  error: string | null;
}

const initialState: IState = {
  token: null,
  isLogged: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLogged = true;
    },
    setIsLogged(state, {payload}: PayloadAction<boolean>) {
      state.isLogged = payload;
    },
  },
  extraReducers: {
    [authorization.fulfilled.type]: (state, action: PayloadAction<number>) => {
      //state.token = action.payload;
      state.error = null;
    },
    [authorization.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    [signUpWithGoogle.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLogged = true;
      state.error = null;
      console.log(action.payload,"action.payload")
    },
    [signUpWithGoogle.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    [signInWithGoogle.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLogged = true;
      state.error = null;
      console.log(action.payload,"action.payload")
    },
    [signInWithGoogle.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    [signUpWithFacebook.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLogged = true;
      state.error = null;
    },
    [signUpWithFacebook.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    [signInWithFacebook.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLogged = true;
      state.error = null;
    },
    [signInWithFacebook.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    // [signUpWithApple.fulfilled.type]: (state, action: PayloadAction<string>) => {
    //   state.token = action.payload;
    //    state.isLogged = true;
    //    state.error = null;
    // },
    // [signUpWithApple.rejected.type]: (state, action: PayloadAction<string>) => {
    //   console.log(action.payload)
    //   state.token = action.payload;
    //    state.isLogged = true;
    //    state.error = null;
    // },


    [signUpWithApple.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLogged = true;
      state.error = null;
      console.log(action.payload,"Payload Apple")
    },
    [signUpWithApple.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    [signInWithApple.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLogged = true;
      state.error = null;
    },
    [signInWithApple.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },



    [signUpWithGoogle.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});
export const {setIsLogged} = authSlice.actions;
export default authSlice.reducer;
