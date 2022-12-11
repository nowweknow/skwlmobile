import React, { useCallback, useState } from 'react';
import { FlatList, ImageBackground, View, Linking, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useDebouncedCallback } from 'use-debounce';
import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';

import { Button, Container, Image, Screen, Text, SVGIcon } from 'components';
import { colors } from 'theme';
import { ProfileNavigatorParams } from 'navigation';
import { HomeStack, ProfileStack, SliderStack } from 'app/navigation/constans';
import { Header, ProductItem, VideoItem } from 'app/screens/common/customComponents';
import { profileForAuth, updateProfile } from 'app/redux/reducers/profile';
import { deleteProduct } from 'app/redux/reducers/marketplace';
import { deleteVideo } from 'app/redux/reducers/video';
import { openLink } from 'app/helpers';
import { PprofileImageType } from 'app/enum';
import { IProfile, IUserImage } from 'app/types';

import imgBackground from './components/img_mock/bg.jpg';
import * as S from './styles';
import { useEffect } from 'react';
import { api } from 'app/api';

enum ProfileTab {
  PRODUCTS = 'products',
  VIDEOS = 'videos',
}
type ProfileScreenTypes = {
  navigation: NativeStackNavigationProp<ProfileNavigatorParams>;
};

export const ViewUserProfileScreen = (props: ProfileScreenTypes) => {
  const [profile, setProfile] = useState<IProfile | null>(null)
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false)
  const [videos, setVideos] = useState(null)
  const [products, setProducts] = useState(null)
  const [tab, setTab] = useState<ProfileTab>(ProfileTab.PRODUCTS);
  const route = useRoute()
  const { navigation } = props;

  useEffect(() => {
    setIsProfileLoading(true)
    api.profileForAuth(route.params.userId)
      .then(res => {
        setProfile(res.data)
        setIsProfileLoading(false)
      })
      .catch(() => setIsProfileLoading(false))
  }, [route.params])

  //mock
  const me = false;

  const dispatch = useDispatch();

  const productItem = useCallback(({ item }) => {
    return <ProductItem showCross={false} {...item} pressClose={pressDeleteProductDebounced} />;
  }, []);

  const videoItem = useCallback(({ item }) => {
    return <VideoItem
      {...item}
      pressClose={pressDeleteVideoDebounced}
      showCross={false}
      onVideoPress={() => navigation.navigate(HomeStack.watchVideoScreen, { videoId: item.id })}
    />;
  }, []);

  const navigateSettings = () => {
    navigation.navigate(ProfileStack.settingsScreen);
  };

  const pressDeleteVideoDebounced = useDebouncedCallback((videoId: number) => {
    pressDeleteVideo(videoId);
  }, 500);

  const pressDeleteVideo = async (id: number) => {
    const res = await dispatch(deleteVideo(id));
    if (res.type === deleteVideo.fulfilled.type) {
      dispatch(profileForAuth(userId));
    }
  };

  const pressDeleteProductDebounced = useDebouncedCallback((productId: number) => {
    pressDeleteProduct(productId);
  }, 500);

  const pressDeleteProduct = async (id: number) => {
    const res = await dispatch(deleteProduct(id));
    if (res.type === deleteProduct.fulfilled.type) {
      dispatch(profileForAuth(userId));
    }
  };

  const onPressLinkHandler = () => {
    openLink(profile?.website_link);
  };

  const onPressEmailHandler = () => {
    try {
      Linking.openURL(`mailto:${profile?.email}`);
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      }
    }
  };

  const pressUploadHandler = async (type: PprofileImageType) => {
    try {
      const res = await ImagePicker.openPicker({
        mediaType: 'photo',
        includeBase64: false,
      });

      const image = { name: res.filename || '', type: res.mime, uri: res.path };
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
          <Text preset={'smallHigh'} color={colors.accent} style={S.STATISTIC_TEXT} onPress={onPressEmailHandler}>
            {profile?.email || ''}
          </Text>
          {profile?.website_link.length > 0 && (
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
          <TouchableOpacity
            style={S.BACK}
            onPress={navigation.goBack}
          >
            <SVGIcon name='arrowLeft' />
          </TouchableOpacity>
          <Header
            isBack={false}
            title={`${profile?.first_name || ''} ${profile?.second_name || ''}`}
            titleColor={colors.white}
            rightIconColor={colors.white}
            iconSize={24}
          />
        </Container>
        <View style={S.PROFILE_PHOTO_CONTAINER}>
          <View style={S.AVATAR} activeOpacity={0.8}>
            <Image size={96} source={{ uri: profile?.avatar }} style={S.PROFILE_PHOTO} />
          </View>
        </View>
      </ImageBackground>
      <Container>
        <View style={S.PROFILE_INFO}>
          <View style={S.PROFILE_TITLE}>
            <Text preset={'titleBold'} style={S.PROFILE_TEXT}>
              {profile?.header || ''}
            </Text>
            <Text preset={'smallHigh'} style={S.PROFILE_DESC}>
              we are a school of gardening. Learn with us about plants.
            </Text>
          </View>
          <View style={S.STATISTIC}>{isProfileLoading ? renderActivityIndicator() : renderStatistic()}</View>
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
        />
      )}
    </Screen>
  );
};
