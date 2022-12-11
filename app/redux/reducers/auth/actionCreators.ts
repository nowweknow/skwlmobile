 import {
  REACT_APP_STAGING_URL,
  REACT_APP_TEST_URL,
  TWITTER_COMSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import {api} from 'app/api';
import {NativeModules, Platform} from 'react-native';
import {
  LoginManager,
  AccessToken,
  LoginResult,
  Settings,
} from 'react-native-fbsdk-next';
import {setProfile} from '../profile/profileSlice';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {cleanSingle} from 'react-native-image-crop-picker';
import {authSlice} from 'app/redux/reducers/auth/authSlice';
import { setIsLogged } from 'app/redux/reducers/auth/authSlice';
import axios from 'axios';

export const authorization = createAsyncThunk(
  'authorization',
  async (_, thunkApi) => {
    try {
      const res = await api.authorize();
      console.log(res,"AUTHRESS")
      return res.status;
    } catch (e) {
      return thunkApi.rejectWithValue('something goes wrong');
    }
  },
);

export const signUpWithGoogle = createAsyncThunk(
  'signUpWithGoogle',
  async (_, thunkApi) => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        result.idToken,
      );
      const authObject = await auth().signInWithCredential(googleCredential);
      const currentUser = await GoogleSignin.getCurrentUser();
      const user = authObject.user;
      console.log('USERRRRIDDDD', currentUser?.user.id);
      const data = await api.socialLogin({
        email: currentUser?.user.email,
        user_id: currentUser?.user.id,
        name: currentUser?.user.name,
        surname: currentUser?.user.familyName,
        avatar_url: currentUser?.user.photo,
      });
      // const data = await api.socialLogin({
      //   email: user.email,
      //   user_id: user.uid,
      //   name: authObject.additionalUserInfo?.profile?.given_name,
      //   surname: authObject.additionalUserInfo?.profile?.family_name,
      //   avatar_url: user.photoURL,
      // });
      if (data.status === 201) {
        const profileRes = await fetch(`${REACT_APP_TEST_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${data.data}`,
          },
        });
        const profile = await profileRes.json();
        thunkApi.dispatch(setProfile({...profile}));
        console.log(profileRes,"ProfileRes")
        console.log(profile,"Profile")
        return data.data;
      } else {
        throw new Error('Unknow error');
      }
    } catch (error) {
      let newError: string = error.message || error;
      if (Platform.OS === 'ios' && newError.includes('canceled the sign-in')) {
        newError = 'Canceled';
      }
      return thunkApi.rejectWithValue(newError);
    }
  },
);

export const signInWithGoogle = createAsyncThunk(
  'signInWithGoogle',
  async (_, thunkApi) => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        result.idToken,
      );
      const authObject = await auth().signInWithCredential(googleCredential);
      const user = authObject.user;
      const currentUser = await GoogleSignin.getCurrentUser();
      console.log(result, 'result');
      console.log(authObject, 'authObject');
      const data = await api.socialLogin({
        email: currentUser?.user.email,
        user_id: currentUser?.user.id,
        name: currentUser?.user.name,
        surname: currentUser?.user.familyName,
        avatar_url: currentUser?.user.photo,
      });
      console.log(currentUser?.user.name, 'currentUser?.user.name');
      
      if (data.status === 201) {
        const profileRes = await fetch(`${REACT_APP_TEST_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${data.data}`,
          },
        });
        console.log(data.data,"googleDAta")
        const profile = await profileRes.json();
        thunkApi.dispatch(setProfile({...profile}));
        console.log(profileRes,"ProfileRes")
        console.log(profile,"Profile")
        return data.data;
      } else {
        throw new Error('Unknow error');
      }
    } catch (error) {
      let newError: string = error.message || error;
      if (Platform.OS === 'ios' && newError.includes('canceled the sign-in')) {
        newError = 'Canceled';
      }
      return thunkApi.rejectWithValue(newError);
    }
  },
);

export const signUpWithFacebook = createAsyncThunk(
  'signUpWithFacebook',
  async (_, thunkApi) => {
    try {
      const result: LoginResult = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      // const result: LoginResult = await LoginManager.logInWithPermissions(['public_profile', 'email', '']);
      console.log(result, 'RESSSSUUULLLLTT');
      if (result.isCancelled) {
        throw new Error('Login cancelled');
      } else {
        const accessToken: AccessToken | null =
          await AccessToken.getCurrentAccessToken();
        const facebookCredential = await auth.FacebookAuthProvider.credential(
          accessToken.accessToken,
        );
        const authObject = await auth().signInWithCredential(
          facebookCredential,
        );
        const user = authObject.user;
        console.log('accessToken', accessToken);
        const data = await api.socialLogin({
          email: user.email,
          user_id: user.uid,
          name: authObject.additionalUserInfo?.profile?.first_name,
          surname: authObject.additionalUserInfo?.profile?.last_name,
          avatar_url: user.photoURL,
        });
        if (data.status === 201) {
          const profileRes = await fetch(
            `${REACT_APP_TEST_URL}/users/profile`,
            {
              headers: {
                Authorization: `Bearer ${data.data}`,
              },
            },
          );
          console.log(data.data,"googleDAta")
          const profile = await profileRes.json();
          thunkApi.dispatch(setProfile({...profile}));
          return data.data;
        } else {
          throw new Error('Unknow error');
        }
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const signInWithFacebook = createAsyncThunk(
  'signInWithFacebook',
  async (_, thunkApi) => {
    try {
      // const result: LoginResult = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      const result: LoginResult = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      console.log(result, 'RESSSSUUULLLLTT');
      if (result.isCancelled) {
        throw new Error('Login cancelled');
      } else {
        const accessToken: AccessToken | null =
          await AccessToken.getCurrentAccessToken();
        const facebookCredential = await auth.FacebookAuthProvider.credential(
          accessToken.accessToken,
        );
        const authObject = await auth().signInWithCredential(
          facebookCredential,
        );
        const user = authObject.user;
        const data = await api.socialLogin({
          email: user.email,
          user_id: user.uid,
          name: authObject.additionalUserInfo?.profile?.first_name,
          surname: authObject.additionalUserInfo?.profile?.last_name,
          avatar_url: user.photoURL,
        });
        if (data.status === 201) {
          const profileRes = await fetch(
            `${REACT_APP_TEST_URL}/users/profile`,
            {
              headers: {
                Authorization: `Bearer ${data.data}`,
              },
            },
          );
          const profile = await profileRes.json();
          thunkApi.dispatch(setProfile({...profile}));
          return data.data;
        } else {
          throw new Error('Unknow error');
        }
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const signUpWithApple = createAsyncThunk(
  'signUpWithApple',
  async (_, thunkApi) => {
    try {
      const credentials = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        credentials.user,
      );
      console.log(credentials.email, credentials.fullName, '3333333');
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
      }
      const appleCredential = auth.AppleAuthProvider.credential(
        credentials.identityToken,
        credentials.nonce,
      );
      const authObject = await auth().signInWithCredential(appleCredential);
      const user = authObject.user;
      const data = await api.appleLogin({
         email: user.email ? user.email : 'no email',
         id_token: credentials.identityToken,
      });
      if (data.status === 201) {
        const profileRes = await fetch(`${REACT_APP_TEST_URL}/users/profile`, {
          headers: {
            //Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlicmFoaW1jYW5rYWx5YUBnbWFpbC5jb20iLCJpZCI6NTcsImlhdCI6MTY1MjcwMzE3MCwiZXhwIjoxNjYwNDc5MTcwfQ.43trDG2HXioG_-AGzdP-xFMcx0wdltaocpoBY3MMEmU`,
            Authorization: `Bearer ${data.data.accessToken}`,
          },
        });
        try {
          const profile = await profileRes.json();
          thunkApi.dispatch(setProfile({...profile}));
          console.log(profileRes.json(),"ProfileRes")
        } catch (err) {
          console.log("Catchhh")
          thunkApi.dispatch(setProfile(null));
        }
        return data.data.accessToken;
      } else {
        throw new Error('Unknow error');
      }
    } catch (error) {
      let newError: string = error.message || error;
      if (Platform.OS === 'ios' && newError.includes('canceled the sign-in')) {
        console.log(error, 'Signin error');
        newError = 'Canceled';
      }
      console.log(error, 'Signin apple error');

      return thunkApi.rejectWithValue(newError);
    }
  },
);

//*-*-*-*-*-*--*--*--------


export const signInWithApple = createAsyncThunk(
  'signInWithApple',
  async (_, thunkApi) => {
    try {
      const credentials = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        credentials.user,
      );
      console.log(credentials.email, credentials.fullName, '3333333');
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
      }
      const appleCredential = auth.AppleAuthProvider.credential(
        credentials.identityToken,
        credentials.nonce,
      );
      const authObject = await auth().signInWithCredential(appleCredential);
      const user = authObject.user;
      const data = await api.appleLogin({
         email: user.email ? user.email : 'no email',
         id_token: credentials.identityToken,
      });
      if (data.status === 201) {
        const profileRes = await fetch(`${REACT_APP_TEST_URL}/users/profile`, {
          headers: {
            //Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlicmFoaW1jYW5rYWx5YUBnbWFpbC5jb20iLCJpZCI6NTcsImlhdCI6MTY1MjcwMzE3MCwiZXhwIjoxNjYwNDc5MTcwfQ.43trDG2HXioG_-AGzdP-xFMcx0wdltaocpoBY3MMEmU`,
            Authorization: `Bearer ${data.data.accessToken}`,
          },
        });
        try {
          const profile = await profileRes.json();
          thunkApi.dispatch(setProfile({...profile}));
          console.log(profileRes.json(),"ProfileRes")
        } catch (err) {
          console.log("Catchhh")
          thunkApi.dispatch(setProfile(null));
        }
        return data.data.accessToken;
      } else {
        throw new Error('Unknow error');
      }
    } catch (error) {
      let newError: string = error.message || error;
      if (Platform.OS === 'ios' && newError.includes('canceled the sign-in')) {
        console.log(error, 'Signin error');
        newError = 'Canceled';
      }
      console.log(error, 'Signin apple error');

      return thunkApi.rejectWithValue(newError);
    }
  },
);

export const signUpWithPhoneNumber = createAsyncThunk<
 string,
  {code: number; id: number},
  {rejectValue: string}
>('signUpWithApple', async ({code, id}, thunkAPI) => {
  try {
    const res = await axios.post(`${REACT_APP_TEST_URL}/user-phone/verify`, {
      code,
      id,
    });
    const token: string = res.data;
    console.log(token,"TOkenn")
    if (token) {
      const profileRes = await fetch(`${REACT_APP_TEST_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profile = await profileRes.json();
      console.log('profile', profile);
      thunkAPI.dispatch(setProfile({...profile}));
    } else {
      throw new Error('Unknow error');
    }
    return token;
  } catch (e: any) {
    console.log('Error:', e.response.data.message);
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});




export const signInWithPhoneNumber = createAsyncThunk<
  string,
  {code: number; id: number},
  {rejectValue: string}
>('signInWithApple', async ({code, id}, thunkAPI) => {
  try {
    const res = await axios.post(`${REACT_APP_TEST_URL}/user-phone/verify`, {
      code,
      id,
    });
    const token: string = res.data;
    console.log(token,"TOkenn")
    if (token) {
      const profileRes = await fetch(`${REACT_APP_TEST_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profile = await profileRes.json();
      console.log('profile', profile);
      thunkAPI.dispatch(setProfile({...profile}));
    } else {
      throw new Error('Unknow error');
    }
    return token;
  } catch (e: any) {
    console.log('Error:', e.response.data.message);
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});