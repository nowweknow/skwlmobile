import React, {useCallback, useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlatList, ImageBackground, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {AppNavigatorParams, HomeNavigatorParams, ProfileNavigatorParams} from 'navigation';
import {Button, Image, MarginTopBlock, Screen, Text} from 'components';
import {HomeNavigation} from 'app/screens/common/screens/home/components/homeNavigation';
import {ProfileStack} from 'app/navigation/constans';
import {getFollowingVideo, getRecommendedUsers, subscribeUser} from 'app/redux/reducers/home/actionCreators';
import {useSelector} from 'hooks';
import {HomeCommon} from 'app/screens/common/screens';

import * as S from './styles';

import {clearVideos} from 'app/redux/reducers/home/homeSlice';
import {ISubscriptionResponse} from 'types';

type NavigationTypes = {
  navigation: NativeStackNavigationProp<HomeNavigatorParams & ProfileNavigatorParams & AppNavigatorParams>;
};

export const FollowingScreen = (props: NavigationTypes) => {
  const isFocused = useIsFocused();
  const {navigation} = props;
  const dispatch = useDispatch();
  const {videos, recommendedUsers, subscriptions, isVideosLoaded, isLoading} = useSelector(state => state.home);

  const flatListHeader = (
    <View style={S.HEADER}>
      <HomeNavigation navigation={navigation} />
    </View>
  );

  const navigateProfile = (userId: string) => {
    navigation.navigate(ProfileStack.profileScreen, {
      userId: userId,
    });
  };
  const followUser = (userId: number) => {
    dispatch(subscribeUser(userId));
  };

  const loadNewVideos = (page: number) => {
    dispatch(getFollowingVideo(page));
  }

  useEffect(() => {
    if (isFocused) {
      loadNewVideos(1)
    }
    return () => {
      dispatch(clearVideos());
    };
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && !videos?.length && isVideosLoaded) {
      dispatch(getRecommendedUsers());
    }
  }, [isFocused, videos?.length, isVideosLoaded]);

  const userRenderItem = useCallback(({item}) => {
    const isFollowed = subscriptions.find((sub: ISubscriptionResponse) => sub.userId === item.id);

    const backgroundImage = item?.background_image ? {uri: item?.background_image} : require('./components/img_mock/wave.jpg');
    const avatar =  {uri: item?.avatar}
    return (
      <TouchableOpacity style={S.USER_CONTAINER} onPress={() => navigateProfile(item.id)}>
        <ImageBackground resizeMode={'cover'} style={S.IMAGE_BG} source={backgroundImage}>
          <Image source={avatar} size={72} style={S.IMAGE} shape={'circle'} />
          <View style={S.USER_INFO}>
            <MarginTopBlock marginTop={8}>
              <Text preset={'titleBoldest'}>
                {item.first_name} {item.second_name}
              </Text>
            </MarginTopBlock>
            <MarginTopBlock marginTop={4}>
              <Text>@{item.username}</Text>
            </MarginTopBlock>
          </View>
          <MarginTopBlock marginTop={8}>
            <Button onPress={() => followUser(item.id)} text={isFollowed ? 'UNFOLLOW' : 'FOLLOW'} preset={'secondary'} />
          </MarginTopBlock>
        </ImageBackground>
      </TouchableOpacity>
    );
  }, []);

  return (
    <Screen safePaddingTop={false} safePaddingBottom={false} statusBar={'light-content'}>
      {videos?.length ? (
        <HomeCommon {...{ loadNewVideos, isVideosLoading: isLoading }} videos={videos} />
      ) : (
        <FlatList
          ListHeaderComponent={flatListHeader}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          numColumns={2}
          columnWrapperStyle={S.ITEM}
          data={recommendedUsers}
          renderItem={userRenderItem}
        />
      )}
    </Screen>
  );
};
