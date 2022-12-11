import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Linking, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Share from 'react-native-share';
import Video from 'react-native-video';
import Carousel from 'react-native-snap-carousel';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, MarginTopBlock, Screen, SVGIcon, Text } from 'components';
import { AppNavigatorParams, HomeNavigatorParams, InboxNavigatorParams, ProfileNavigatorParams } from 'navigation';
import { Image } from 'app/components/image';
import { Container } from 'app/components/container';
import { AdsBlock } from 'app/screens/common/screens/home/components/adsBlock';
import { HomeStack, InboxStack } from 'app/navigation/constans';
import { HomeNavigation } from 'app/screens/common/screens/home/components/homeNavigation';
import { SCREEN_HEIGHT, SCREEN_WIDTH, TAB_ANDROID_HEIGHT, TAB_IOS_HEIGHT } from 'variables';
import { colors } from 'theme';
import { useSelector } from 'hooks';
import { likeVideo, subscribeUser } from 'app/redux/reducers/home/actionCreators';
import { IProfile, IVideoResponse } from 'app/types';
import { createVideoLink, isIos } from 'app/helpers';

import * as S from './styles';
import { setLikedVideosIds } from 'app/redux/reducers/video/videoSlice';
import { setVideos } from 'app/redux/reducers/home/homeSlice';
import { video } from 'app/redux/selectors';
import { setProfile } from 'app/redux/reducers/profile/profileSlice';
import { api } from 'app/api'
interface IProps {
  image_link: string;
  videos: Array<IVideoResponse> | null;
  isWatchingOwnVideo?: boolean
  isBackButton?: boolean
  isVideosLoading?: boolean
  setVideo?: (video: IVideoResponse) => void
  loadNewVideos?: (page: number) => void
}

export const HomeCommon = ({ videos, isWatchingOwnVideo, isBackButton, setVideo, loadNewVideos, isVideosLoading }: IProps) => {
  const [isShowProduct, setIsShowProduct] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const navigation = useNavigation<NativeStackNavigationProp<HomeNavigatorParams & ProfileNavigatorParams & InboxNavigatorParams & AppNavigatorParams>>();
  const { isLogged } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.home);
  const profile: IProfile | null = useSelector(state => state.profile.profile);
  const [likesCountOfOneVideo, setLikesCountOfOneVideo] = useState<number | null>(null)
  const likedVideosIds: number[] | null = useSelector(state => state.video.likedVideosIds);
  const isScreenFocused: boolean = useIsFocused()
  const isOnlyOneVideo = isWatchingOwnVideo || isBackButton
  const loadMore = () => {
    if (!isOnlyOneVideo && loadNewVideos && !isVideosLoading) {
      loadNewVideos(page + 1)
      setPage(page + 1)
    }
  }
  //   const storageinfo = async () => {
  //   const userid = await AsyncStorage.getItem('@user_id');
  //   const userMail = await AsyncStorage.getItem('@email');
  //   console.log("asyncronnnn",userid,userMail);
  // }
  // storageinfo();

  const likeVideoHandler = (videoId: number) => {
    if (likedVideosIds?.some(id => id === videoId)) {
      dispatch(setLikedVideosIds(likedVideosIds.filter(id => id !== videoId)))
      if (isOnlyOneVideo)
        setLikesCountOfOneVideo(((likesCountOfOneVideo as number) - 1))
      else {
        if (videos?.length) {
          dispatch(setVideos(
            videos.map(video => ({ ...video, ...video.id === videoId && { likes: (video.likes > 0 ? video.likes - 1 : video.likes) } }))
          ))
        }
      }
    } else if (likedVideosIds) {
      dispatch(setLikedVideosIds([...likedVideosIds, videoId]))
      if (isOnlyOneVideo)
        setLikesCountOfOneVideo(((likesCountOfOneVideo as number) + 1))
      else {
        if (videos?.length) {
          dispatch(setVideos(
            videos.map(video => ({ ...video, ...video.id === videoId && { likes: (video.likes + 1) } }))
          ))
        }
      }
    }
    dispatch(likeVideo(videoId));
  };
  const navigateTagScreen = (tag: string) => {
    navigation.navigate(HomeStack.tagScreen, { tag });
  };

  const openShareModal = async (id: number) => {
    try {
      await Share.open({
        message: await createVideoLink(id),
      })
    } catch (e) {
      console.log(e);
    }
  };
  // if (!videos) {
  if (!videos || (isLogged && (!likedVideosIds))) {
    return <ActivityIndicator style={S.LOADER} size="large" color={colors.grey1} />;
  }

  const showProductHandler = () => {
    setIsShowProduct(true);
  };

  const viewUserProfile = (userId: number) => navigation.navigate(HomeStack.viewUserProfileScreen, { userId })

  const ITEM_HEIGHT = isIos ? SCREEN_HEIGHT - TAB_IOS_HEIGHT : SCREEN_HEIGHT - TAB_ANDROID_HEIGHT;

  const onFollowUnfollowPress = (userId: number) => {
    dispatch(subscribeUser(userId))
    if (videos.some(video => (video.user.id === userId && video.user.followers?.length > 0))) {
      dispatch(setProfile({ ...profile as IProfile, followingCount: (profile as IProfile).followingCount - 1 }))
      if (isOnlyOneVideo && setVideo) {
        setVideo({ ...videos[0], ...videos[0].user.id === userId && { followers: [] } })
      } else {
        if (videos?.length) {
          dispatch(setVideos(
            videos.map(video => ({ ...video, ...video.user.id === userId && { user: { ...video.user, followers: [] } } }))
          ))
        }
      }
    } else {
      dispatch(setProfile({ ...profile as IProfile, followingCount: (profile as IProfile).followingCount + 1 }))
      if (isOnlyOneVideo && setVideo) {
        setVideo({ ...videos[0], ...videos[0].user.id === userId && { user: { ...videos[0].user, followers: [{ id: 1 }] } } })
      } else {
        if (videos?.length) {
          dispatch(setVideos(
            videos.map(video => ({ ...video, ...video.user.id === userId && { user: { ...video.user, followers: [{ id: 1 }] } } }))
          ))
        }
      }
    }
  }

  const goWebReport = () => {
    console.log("weeebbbb")
    Linking.openURL('https://nowuknow9.godaddysites.com/support-%2F-contact-us')
  }

  const footer = () => {
    return <>
      <ActivityIndicator size="large" />
    </>
  }

  const onTabChange = () => { setPage(1) }

  const videoItem = ({ item }: { item: IVideoResponse }) => {
    if (isOnlyOneVideo && !likesCountOfOneVideo)
      setLikesCountOfOneVideo(item.likes)

    return (
      <TouchableOpacity style={S.CONTAINER} onLongPress={showProductHandler} activeOpacity={1}>
        {(isWatchingOwnVideo || isBackButton)
          ? <TouchableOpacity
            style={S.BACK}
            onPress={navigation.goBack}
          >
            <SVGIcon name='arrowLeft' />
          </TouchableOpacity>
          : <HomeNavigation navigation={navigation} {...{ onTabChange }} />}
        <Video
          source={{ uri: item.link }}
          style={S.VIDEO} volume={10}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
        <Container>
          <View style={[S.ROW, S.ROW_END, S.PRODUCT]}>
            <AdsBlock link={item.product_link} title={item.product_title} price={item.price} />
            <TouchableOpacity onPress={() => Linking.openURL(item.product_link)}>
              <Image size={48} shape={'circle'} style={S.PRODUCT_PHOTO} source={{ uri: item.product_image_link }} />
            </TouchableOpacity>
          </View>
          <View style={S.ROW}>
            <View style={S.FLEX_1}>
              <View style={S.TAGS_WRAPPER}>
                {item.hashtag.split(', ').map(tagItem => (
                  <TouchableOpacity
                    key={tagItem}
                    onPress={() => navigateTagScreen(tagItem)}>
                    <Text preset={'titleBoldest'} style={S.TAGS}>
                      {tagItem}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={S.DESCRIPTION}>{item.title}</Text>
            </View>
            <TouchableOpacity
              style={S.ICON}
              disabled={!isLogged}
              onPress={() => {
                likeVideoHandler(item.id);
              }}>
              <SVGIcon name={`${(likedVideosIds?.some(id => (id === item.id)) && item.likes > 0) ? 'likeFilled' : 'like'}`} size={24} />
              <Text preset={'smallBold'} style={S.ICON_TEXT}>
                {String(isOnlyOneVideo ? likesCountOfOneVideo : item.likes)}
              </Text>
            </TouchableOpacity>
          </View>
          <MarginTopBlock marginTop={10}>
            <View style={S.ROW}>
              <View style={S.PROFILE_CONTAINER}>
                <TouchableOpacity
                  onPress={() => viewUserProfile(item.user.id as number)}
                >
                  <Image style={S.PROFILE_PHOTO} shape={'circle'} source={{ uri: item?.user?.avatar }} height={28} width={28} />
                </TouchableOpacity>
                <View style={S.PROFILE}>
                  <TouchableOpacity
                    onPress={() => viewUserProfile(item.user.id as number)}
                  >
                    <Text style={S.PROFILE_NAME} numberOfLines={2}>
                      {item.user?.first_name} {item.user?.second_name}
                    </Text>
                  </TouchableOpacity>
                  {isLogged && !isWatchingOwnVideo && (
                    <Button
                      style={S.PROFILE_BTN}
                      preset={'text'}
                      text={(item.user?.followers?.length > 0) ? 'FOLLOWING' : 'FOLLOW'}
                      textStyle={S.PROFILE_BTN_TEXT}
                      onPress={() => onFollowUnfollowPress(item.user.id as number)}
                    />
                  )}
                  <View>
                    <Button
                      style={S.PROFILE_BTN}
                      preset={'text'}
                      text={' REPORT '}
                      textStyle={S.PROFILE_BTN_TEXT}
                      onPress={() => goWebReport()}
                    />
                  </View>

                </View>
              </View>

              {profile?.id ? (
                item.user.id == profile?.id ? (
                  <TouchableOpacity
                    style={S.ICON}
                    onPress={() => {
                      // {console.log(item.user.id,profile?.id,"afafafafasfasf")}
                      // Alert.alert('You can not open a chat with yourself')
                    }}
                  >
                    <SVGIcon name={'message'} size={24} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={S.ICON}
                    onPress={() => {
                      navigation.navigate(InboxStack.inboxDialogScreen, { id: item.user.id, name: item.user.first_name });
                    }}
                  >
                    <SVGIcon name={'message'} size={24} />
                  </TouchableOpacity>

                )

              ) : (
                <TouchableOpacity
                  style={S.ICON}
                  onPress={() => {
                    //navigation.navigate(InboxStack.inboxDialogScreen, { id: item.user.id, name: item.user.first_name });
                  }}
                >
                  <SVGIcon name={'message'} size={24} />
                </TouchableOpacity>)}
            </View>
          </MarginTopBlock>
          <MarginTopBlock marginTop={32}>
            <TouchableOpacity style={[S.SHARE, S.ICON]} onPress={() => openShareModal(item.id)}>
              <SVGIcon name={'dotsHorizontal'} size={24} />
            </TouchableOpacity>
          </MarginTopBlock>
        </Container>
      </TouchableOpacity>
    );
  };

  return (
    <Screen backgroundColor={colors.lightGreyOpacity} safePaddingTop={false} safePaddingBottom={false} statusBar={'light-content'}>

      <Carousel
        keyExtractor={video => video.id.toString()}
        data={videos}
        renderItem={videoItem}
        onEndReached={loadMore}
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={ITEM_HEIGHT}
        loop={false}
        itemWidth={SCREEN_WIDTH}
        itemHeight={ITEM_HEIGHT}
        vertical={true}
        inactiveSlideScale={1}
        onBeforeSnapToItem={() => setIsShowProduct(false)}
        ListFooterComponent={footer}
      />
    </Screen>
  );
};
