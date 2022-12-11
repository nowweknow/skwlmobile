import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileNavigatorParams} from 'navigation';

import {Container, Screen} from 'components';
import {Header, VideoItem} from 'app/screens/common/customComponents';
import {getLikedVideo} from 'app/redux/reducers/video';

import * as S from './styles';
import {ProfileStack} from '../../navigation/constans';
import {useSelector} from 'hooks';

export const LikedVideosScreen = () => {
  const likedVideo = useSelector(state => state.video.likedVideo);
  const {navigate} =
    useNavigation<NativeStackNavigationProp<ProfileNavigatorParams>>();
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getLikedVideo());
    }, [dispatch]),
  );

  const videoItem = useCallback(
    ({item}) => (
      <VideoItem
        {...item.video}
        onVideoPress={() =>
          navigate(ProfileStack.myVideoScreen, {videoId: item.video.id})
        }
      />
    ),
    [],
  );

  return (
    <Screen>
      <Container>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Header style={S.HEADER} title={'My Liked Videos'} isBack={true} />
          }
          keyExtractor={item => item.id.toString()}
          columnWrapperStyle={S.CONTAINER}
          numColumns={2}
          data={likedVideo}
          renderItem={videoItem}
        />
      </Container>
    </Screen>
  );
};
