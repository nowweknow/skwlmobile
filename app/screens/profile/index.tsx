import React, { useCallback, useState } from 'react';
import { FlatList, ImageBackground, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useDebouncedCallback } from 'use-debounce';
import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';

import { Button, Container, Image, Screen, Text, SVGIcon } from 'components';
import { colors } from 'theme';
import { ProfileNavigatorParams } from 'navigation';
import { ProfileStack } from 'app/navigation/constans';
import { Header, ProductItem, VideoItem } from 'app/screens/common/customComponents';
import { profile as getProfile, profileForAuth, updateProfile } from 'app/redux/reducers/profile';
import { deleteProduct } from 'app/redux/reducers/marketplace';
import { deleteVideo } from 'app/redux/reducers/video';
import { openLink } from 'app/helpers';
import { PprofileImageType } from 'app/enum';
import { IUserImage } from 'app/types';

import imgBackground from './components/img_mock/bg.jpg';
import * as S from './styles';

enum ProfileTab {
  PRODUCTS = 'products',
  VIDEOS = 'videos',
}
type ProfileScreenTypes = {
  navigation: NativeStackNavigationProp<ProfileNavigatorParams>;
};

export const ProfileScreen = (props: ProfileScreenTypes) => {
  const [tab, setTab] = useState<ProfileTab>(ProfileTab.PRODUCTS);
  const { navigation } = props;

  const {
    auth: { userId },
    profile: { profile, isLoading },
  } = useSelector(state => state);

  //mock
  const me = true;

  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        dispatch(profileForAuth(userId));
      } else {
        dispatch(getProfile());
      }
    }, [dispatch, userId]),
  );

  const pressDeleteProductDebounced = useDebouncedCallback((productId: number) => {
    pressDeleteProduct(productId);
  }, 500);

  const productItem = useCallback(
    ({ item }) => {
      return <ProductItem {...item} dontShowUser pressClose={pressDeleteProductDebounced} pressSave />;
    },
    [pressDeleteProductDebounced],
  );

  const videoItem = useCallback(
    ({ item }) => {
      return (
        <VideoItem {...item} showCircle={false} pressClose={pressDeleteVideoDebounced} onVideoPress={() => navigation.navigate(ProfileStack.myVideoScreen, { videoId: item.id })} />
      );
    },
    [navigation, pressDeleteVideoDebounced],
  );

  const navigateSettings = () => {
    navigation.navigate(ProfileStack.settingsScreen);
  };

  const pressDeleteVideoDebounced = useDebouncedCallback((videoId: number) => {
    pressDeleteVideo(videoId);
  }, 500);

  const pressDeleteVideo = async (id: number) => {
    const res = await dispatch(deleteVideo(id));
    if (res.type === deleteVideo.fulfilled.type) {
      dispatch(getProfile());
    }
  };

  const pressDeleteProduct = async (id: number) => {
    const res = await dispatch(deleteProduct(id));
    if (res.type === deleteProduct.fulfilled.type) {
      dispatch(getProfile());
    }
  };

  const onPressLinkHandler = () => {
    openLink(profile?.website_link);
  };

  const pressUploadHandler = async (type: PprofileImageType) => {
    try {
      const res = await ImagePicker.openPicker({
        mediaType: 'photo',
        includeBase64: false,
      });

      const image = { name: res.filename || String(Date.now()), type: res.mime, uri: res.path };
      const data = type === PprofileImageType.AVATAR ? { avatar: image } : { background_image: image };

      uploadFile(data);
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      }
      await ImagePicker.clean();
    }
  };

  const uploadFile = async (data: IUserImage) => {
    const res = await dispatch(updateProfile(data));
    if (res.type === updateProfile.fulfilled.type) {
      Snackbar.show({
        text: 'File updated successfully',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.success,
      });
      dispatch(profileForAuth(profile?.id));
    }
  };

  const renderStatistic = () => {
    return (
      <>
        <View style={[S.STATISTIC_COL, S.STATISTIC_COL_MARGIN]}>
          <Text preset={'titleBold'}>{profile?.username || ''}</Text>
          {profile?.website_link?.length > 0 && (
            <Text preset={'smallHigh'} color={colors.accent} style={S.STATISTIC_TEXT} onPress={onPressLinkHandler}>
              {profile?.website_link}
            </Text>
          )}
        </View>
        <View style={S.STATISTIC_COL}>
          <Text preset={'titleBold'}>{profile?.followersCount || 0}</Text>
          <Text preset={'smallHigh'} style={S.STATISTIC_TEXT}>
            Followers
          </Text>
        </View>
        <View style={S.STATISTIC_COL}>
          <Text preset={'titleBold'}>{profile?.followingCount || 0}</Text>
          <Text preset={'smallHigh'} style={S.STATISTIC_TEXT}>
            Following
          </Text>
        </View>
      </>
    );
  };

  const renderActivityIndicator = () => {
    return (
      <View style={S.SPINNER}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const flatListHeader = (
    <>
      <ImageBackground resizeMode="cover" source={profile?.background_image ? { uri: profile?.background_image } : imgBackground} style={[S.IMAGE_BG]}>
        <Container>
          <Header
            isBack={false}
            rightIconHandler={me && navigateSettings}
            rightIcon={'settings'}
            title={`${profile?.first_name || ''} ${profile?.second_name || ''}`}
            titleColor={colors.white}
            rightIconColor={colors.white}
            iconSize={24}
          />
          <TouchableOpacity style={S.UPLOAD_BG} onPress={() => pressUploadHandler(PprofileImageType.PROFILE_BACKGROUND)} activeOpacity={0.8}>
            <SVGIcon name="upload" color={colors.white} size={23} />
          </TouchableOpacity>
        </Container>

        <View style={S.PROFILE_PHOTO_CONTAINER}>
          <TouchableOpacity style={S.AVATAR} onPress={() => pressUploadHandler(PprofileImageType.AVATAR)} activeOpacity={0.8}>
            <Image size={96} source={{ uri: profile?.avatar }} style={S.PROFILE_PHOTO} />
            <View style={S.UPLOAD_BUTTON}>
              <SVGIcon name="upload" color={colors.darkGrey} size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Container>
        <View style={S.PROFILE_INFO}>
          <View style={S.PROFILE_TITLE}>
            <Text preset={'titleBold'} style={S.PROFILE_TEXT}>
              {profile?.header || ''}
            </Text>
            <Text preset={'smallHigh'} style={S.PROFILE_DESC}>
              {profile?.description}
            </Text>
          </View>
          <View style={S.STATISTIC}>{isLoading ? renderActivityIndicator() : renderStatistic()}</View>
        </View>
      </Container>

      <View style={S.TABS}>
        <Button
          onPress={() => setTab(ProfileTab.VIDEOS)}
          style={S.TABS_BUTTON}
          textStyle={[S.TABS_BUTTON_TEXT, tab === ProfileTab.VIDEOS && S.ACTIVE_TAB]}
          text={`VIDEOS (${profile?.videosCount || 0})`}
          preset={'text'}
        />
        <Button
          onPress={() => setTab(ProfileTab.PRODUCTS)}
          style={S.TABS_BUTTON}
          textStyle={[S.TABS_BUTTON_TEXT, tab === ProfileTab.PRODUCTS && S.ACTIVE_TAB]}
          text={`PRODUCTS (${profile?.marketplaceCount || 0})`}
          preset={'text'}
        />
      </View>
    </>
  );

  return (
    <Screen safePaddingTop={false} safePaddingBottom={false} statusBar={'light-content'}>
      {tab === ProfileTab.PRODUCTS ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={flatListHeader}
          keyExtractor={(item, index) => item.price + index.toString()}
          columnWrapperStyle={S.ITEM_CONTENT}
          numColumns={2}
          data={profile?.marketplaces}
          renderItem={productItem}
          ListEmptyComponent={<NoContent a={"product"}/>}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={flatListHeader}
          keyExtractor={(item, index) => item.img + index.toString()}
          columnWrapperStyle={S.ITEM_CONTENT}
          numColumns={2}
          data={profile?.videos}
          renderItem={videoItem}
          ListEmptyComponent={<NoContent a={"video"}/>}
        />
      )}
    </Screen>
  );
};
const NoContent=({ a }:{a:string})=>{
  return  <>
   <View style={S.NO_ITEM}>
    <Text>You dont have any {a} now</Text>
    </View>
  </>
}