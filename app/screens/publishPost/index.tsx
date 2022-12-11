import React, { useState } from 'react';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Keyboard, PermissionsAndroid, Platform, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import ApiVideoUploader from '@api.video/react-native-video-uploader';
import RNVideo from 'react-native-video'

import { Button, Container, Input, MarginTopBlock, Screen, Text } from 'components';
import { Header } from 'app/screens/common/customComponents';
import { colors } from 'theme';
import { AddProductModal } from 'app/screens/common/customComponents/addProductModal';
import { initialProductState } from 'app/variables';
import { API_VIDEO_UPLOAD_TOKEN } from '@env'

import * as S from './styles';
import { ModalDelete } from './modalDelete/index';
import { Video } from '@api.video/react-native-video-uploader/lib/typescript/video-type';
import { useEffect } from 'react';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { useDispatch, useSelector } from 'react-redux';
import { postVideo } from 'app/redux/reducers/video/actionCreators';
import { profile as getMyProfile } from 'app/redux/reducers/profile/actionCreators';
import { profile as profileSelector, video } from 'app/redux/selectors';
import { ButtonPresetNames } from 'app/components/button/button.presets';
import { setDidIPublishedNewVideo } from 'app/redux/reducers/video/videoSlice';
import { BottomTabStack } from 'app/navigation/constans';
import { MARGIN_BOTTOM_SP4 } from 'app/variables/common-styles';
import { IProfile } from 'types';
import Snackbar from 'react-native-snackbar';

export interface IProduct {
  title: string;
  link: string;
  price: string;
  image_link: { name: string; type: string; uri: string };
}

export interface ICompletedNewVideoData {
  caption: string,
  videoLink: string,
  hashtag: string,
  productData: IProduct,
}

export const PublishPost = () => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [isProductModal, setIsProductModal] = useState<boolean>(false);
  const [productData, setProductData] = useState<IProduct>(initialProductState);
  const [caption, setCaption] = useState<string>('');
  const [hashtag, setHashtag] = useState<string>('');
  const navigation = useNavigation()
  const isScreenFocused = useIsFocused()

  const [isVideoUploading, setIsVideoUploading] = useState<boolean>(false);
  const isThunkLoading: boolean = useSelector(video.isLoading)
  const isLoading: boolean = isThunkLoading || isVideoUploading
  const didIPublishedNewVideo: boolean = useSelector(video.didIPublishedNewVideo)
  const profile : IProfile | null = useSelector(profileSelector.my)

  const route: RouteProp<any, string> = useRoute();
  const dispatch = useDispatch()
  const videoPath = route?.params?.path;

  const showDeleteModal = () => {
    setIsShowDeleteModal(true);
  };

  const showProductModal = () => {
    setIsProductModal(true);
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);

      if (
        granted['android.permission.CAMERA'] !==
        PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.READ_EXTERNAL_STORAGE'] !==
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        throw new Error('Permissions request failed');
      }
    }
  };

  useEffect(() => {
    setCaption('')
    setHashtag('')
    requestPermissions()
  }, [])

  useEffect(() => {
    setCaption('')
    setHashtag('')
    if (isScreenFocused) {
      dispatch(getMyProfile())
    }
  }, [isScreenFocused])

  useEffect(() => {
    if (didIPublishedNewVideo) {
      setProductData(initialProductState)
      setCaption('')
      setHashtag('')
      dispatch(setDidIPublishedNewVideo(false))
      navigation.navigate(BottomTabStack.profileTab)
    }
  }, [didIPublishedNewVideo])

  const success =()=>{
    navigation.navigate(BottomTabStack.profileTab)
    Snackbar.show({
      text: 'video upload successful',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: colors.success,
    });
    
  }

  useEffect(() => {
    if (profile?.is_blocked) {
      Snackbar.show({
        text: 'You are blocked, you cannot post a new posts now',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.red,
      });
      navigation.goBack()
    }
  }, [profile])

  const onPublish = async () => {
    const chunkSize = '20'
    console.log("videoupload basladı")
    //ApiVideoUploader.setChunkSize(1024 * 1024 * parseInt(chunkSize));
    const resolveUri = (u: string): Promise<string> => {
      return Platform.OS === 'android'
        ? ReactNativeBlobUtil.fs.stat(u).then((stat) => stat.path)
        : new Promise((resolve, _) => resolve(u));
    };

    resolveUri(videoPath).then((u) => {
      setIsVideoUploading(true)
      ApiVideoUploader.uploadWithUploadToken(
        API_VIDEO_UPLOAD_TOKEN, u)
        .then((value: Video) => {
         
          setIsVideoUploading(false)
          dispatch(postVideo({
            caption,
            hashtag,
            videoLink: value.assets?.mp4,
            productData,
          }))
          console.log("videoupload bitti")
          success();
      
        })
        .catch((e: any) => {
          setIsVideoUploading(false)
          Alert.alert(e)
        });
    });
  }

  const isDataComplete: boolean = (
    caption.length
    && productData.title
    && productData.price
    && productData.link
    && productData.image_link.uri
    && videoPath
  )

  let buttonPreset: ButtonPresetNames = 'primary'
  if (isLoading) buttonPreset = 'primaryLoading'
  else if (!isDataComplete) buttonPreset = 'primaryDisabled'

  return (
    <Screen preset={'scroll'}>
      <Container style={MARGIN_BOTTOM_SP4}>
        <Header title={'Publish'} isBack={true} />
        <MarginTopBlock marginTop={37}>
          <View style={S.VIDEO_POSTER_WRAPPER}>
            <RNVideo
              resizeMode={'cover'}
              paused
              source={{ uri: videoPath }}
              style={S.VIDEO_POSTER}
              poster={videoPath}
              posterResizeMode={'cover'}
            />
          </View>
          <MarginTopBlock marginTop={33}>
            <Text preset={'titleBoldest'} text={'CAPTION'} color={colors.stone} />
            <MarginTopBlock>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={S.TEXTAREA_CONTAINER}>
                  <TextInput
                    multiline={true}
                    style={S.TEXTAREA}
                    underlineColorAndroid="transparent"
                    placeholder="Type something"
                    numberOfLines={10}
                    value={caption}
                    onChangeText={text => setCaption(text)}
                  />
                </View>
              </TouchableWithoutFeedback>
              <MarginTopBlock marginTop={12}>
                <Text preset={'titleBoldest'} text={'HASHTAGS'} color={colors.stone} />
                <MarginTopBlock marginTop={12}>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={S.TEXTAREA_CONTAINER}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="Hashtags"
                        value={hashtag}
                        onChangeText={text => setHashtag(text)}
                        style={S.HASHTAGS}
                        multiline
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </MarginTopBlock>
              </MarginTopBlock>
              <MarginTopBlock marginTop={12}>
                <Text preset={'titleBoldest'} text={'PRODUCTS'} color={colors.stone} />
              </MarginTopBlock>
              <MarginTopBlock marginTop={10}>
                <Input
                  iconLeft={'basket'}
                  leftIconSize={20}
                  iconRight={isProductModal ? 'delete' : 'plus'}
                  rightIconColor={colors.grey2}
                  rightIconHandler={isProductModal ? showDeleteModal : showProductModal}
                  leftIconColor={colors.grey2}
                  value={''}
                  onChangeText={() => { }}
                  placeholder={productData.title || 'product'}
                  editable={false}
                />
                {isShowDeleteModal && <ModalDelete isShow={isShowDeleteModal} setIsShowModal={setIsShowDeleteModal} />}
                {isProductModal && (
                  <AddProductModal
                    dontCreateProduct
                    initialProductState={initialProductState}
                    isShow={isProductModal}
                    setIsShowModal={setIsProductModal}
                    setProductData={setProductData}
                    productData={productData}
                  />
                )}
              </MarginTopBlock>
            </MarginTopBlock>
          </MarginTopBlock>
          <MarginTopBlock marginTop={36}>
            <Button
              style={S.PUBLISH}
              text={'Publish'}
              {...!isLoading && { iconRight: 'arrowRight' }}
              iconSize={10}
              onPress={onPublish}
              disabled={!isDataComplete || isLoading}
              preset={buttonPreset}
            />
          </MarginTopBlock>
        </MarginTopBlock>
      </Container>
    </Screen>
  );
};
