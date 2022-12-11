import axios, {CancelToken} from 'axios';
import {REACT_APP_STAGING_URL, REACT_APP_TEST_URL} from '@env';

import {ICompletedNewVideoData, IProduct} from 'app/screens/publishPost';
import {
  IMessage,
  INotificationsSettings,
  ISocialLoginParams,
  IAppleLoginParams,
  IUser,
} from 'app/types';
import {setupStore} from 'app/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getToken = (): string | null => setupStore().getState().auth.token;

const instance = axios.create({
  withCredentials: false,
  baseURL: REACT_APP_TEST_URL,
});

instance.interceptors.request.use(
  async config => {
    config.headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export const api = {
  //auth
  authorize() {
    return instance.get('/auth');
  },
  socialLogin(data: ISocialLoginParams) {
    return instance.post('/auth/login', data);
  },
  appleLogin(data: IAppleLoginParams) {
    console.log(data,"AuthAppleDATAAA")
    return instance.post('/auth/apple', data);
  },

  //home page
  getNewVideo(page: number) {
    return instance.get('/video/new/' + page);
  },
  getNewVideoAuth(page: number) {
    return instance.get('/video/auth/new/' + page);
  },
  getTrendingVideo(page: number) {
    return instance.get('/video/trending/' + page);
  },
  getTrendingVideoAuth(page: number) {
    return instance.get('/video/auth/trending/' + page);
  },
  likeVideo(videoId: number) {
    return instance.patch(`/user-likes/update/${videoId}`, {videoId});
  },
  followingVideo(page: number) {
    return instance.get('/video/following/' + page);
  },
  getLikedVideo() {
    return instance.get(`/user-likes/videos/saved`);
  },
  //users
  getRecommendedUsers() {
    return instance.get('/users/auth/recommended');
  },
  subscribeUser(userId: number) {
    return instance.post('/user-followers/subscribe', {userId});
  },

  getVideoByIdAuth(id: number) {
    return instance.get('/video/auth/find/' + id);
  },

  getVideosByHashtag(tag: string, cancelToken?: CancelToken) {
    return instance.post('/video/auth/search', {hashtag: tag}, {cancelToken});
  },

  // marketplace
  getProducts(isLogged: boolean) {
    return instance.get(
      isLogged ? '/marketplace/auth/list' : '/marketplace/list',
    );
  },
  addProduct(product: IProduct) {
    const data = new FormData();
    for (const [key, value] of Object.entries(product)) {
      data.append(key, value);
    }

    return fetch(`${REACT_APP_TEST_URL}/marketplace/create`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
      },
      body: data,
    });
  },
  searchProducts(title: string) {
    return instance.post('/marketplace/search', {params: {title}});
  },
  searchProductsForAuth(title: string) {
    return instance.post('/marketplace/auth/search', {title});
  },
  updateSaveStatusProduct(productId: number) {
    return instance.patch('/marketplace-saved/update', {
      marketplaceId: productId,
    });
  },
  getSavedProducts() {
    return instance.get('/marketplace-saved/products');
  },
  deleteProduct(productId: number) {
    return instance.delete('marketplace/delete', {
      data: {marketplaceId: productId},
    });
  },

  // profile
  profile() {
    return instance.get('/users/profile');
  },
  profileForAuth(userId: string) {
    return instance.get(`/users/profile/${userId}`);
  },
  updateProfile(user: IUser) {
    const data = new FormData();

    for (const [key, value] of Object.entries(user)) {
      data.append(key, value);
    }
console.log(data)
    return fetch(`${REACT_APP_TEST_URL}/users/update`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
      },
      body: data,
    });
  },

  // video
  postVideo(data: ICompletedNewVideoData) {
    const bodyFormData = new FormData();
    bodyFormData.append('title', data.caption);
    bodyFormData.append('hashtag', data.hashtag);
    bodyFormData.append('link', data.videoLink);
    bodyFormData.append('product_title', data.productData.title);
    bodyFormData.append('product_link', data.productData.link);
    bodyFormData.append('price', data.productData.price);
    const image = {
      uri: data.productData.image_link.uri,
      type: data.productData.image_link.type,
      name: String(Date.now()),
    };
    bodyFormData.append('product_image', image);
    return fetch(`${REACT_APP_TEST_URL}/video`, {
      method: 'post',
      body: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  getFollowingVideo() {
    return instance.get('video/following');
  },
  deleteVideo(videoId: number) {
    return instance.delete('video/delete', {data: {videoId}});
  },

  // payment
  completePayment(receipt: string) {
    return instance.post('/not-made-yet', {data: {receipt}});
  },

  //report
  report(text: string) {
    return instance.post('/report', {text});
  },

  //chats
  getChats() {
    return instance.get('/chats',{
      method: 'get',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
      },
    }
    )
  },
  getChatsPost(companionId: number) {
    return instance.post('/chats', {companionId},{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
      }
    })},
  getAllMessagesOfChat(chatId: number) {
    return instance.get(`/messages/chat/${chatId}`,{
      method: 'get',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
      }
  });
  },

  //notifications
  getNotifications(page: number) {
    return instance.get(`/notification/${page}`);
  },
  getNotificationsSettings() {
    //return instance.get(`/notification-settings`);
    return {
      data: {
        newFollower: true,
        newMessage: true,
        newLike: true,
      },
    };
  },
  updateNotificationsSettings(data: INotificationsSettings) {
    //return instance.patch(`/notification-settings`, data);
    return {
      data: {
        res: true,
      },
    };
  },

  //token
  sendFcmTokenAndDeviceInfo(data: {
    userId: number;
    deviceId: string;
    deviceName: string;
    brand: string;
    token: string;
    deviceUniqueId: string;
  }) {
    return instance.post(`/user-device/`, data);
  },
};
