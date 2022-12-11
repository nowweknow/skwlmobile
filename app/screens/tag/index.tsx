import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';

import {Container, Screen, SVGIcon, Text} from 'components';
import {colors} from 'theme';
import {Header, VideoItem} from 'app/screens/common/customComponents';
import {HomeStackRouteProps} from 'navigation';
import {IVideo} from 'types';

import * as S from './styles';
import {HomeStack} from '../../navigation/constans';
import {api} from '../../api';

export const TagScreen = () => {
  const {params} = useRoute<HomeStackRouteProps<HomeStack.tagScreen>>();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const cancelToken = useRef(axios.CancelToken.source()).current;

  useEffect(() => {
    api
      .getVideosByHashtag(params.tag, cancelToken.token)
      .then(res => setVideos(res.data));
    return () => {
      cancelToken.cancel();
    };
  }, []);

  const flatListHeader = (
    <>
      <Container>
        <Header style={S.HEADER} title={'Tags'} isBack={true} />
        <View style={S.CONTENT}>
          <View style={S.TAG_BLOCK}>
            <View style={S.TAG_BOX}>
              <SVGIcon name={'hashtag'} color={colors.black} size={40} />
            </View>
            <View style={S.TAG_INFO}>
              <View>
                <Text preset={'titleBoldest'}>{params.tag}</Text>
              </View>
            </View>
          </View>
        </View>
      </Container>
    </>
  );

  return (
    <Screen>
      <FlatList
        ListHeaderComponent={flatListHeader}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.product_image_link}
        numColumns={3}
        data={videos}
        renderItem={({item}) => <VideoItem {...item} />}
        ListEmptyComponent={
          <ActivityIndicator size={'large'} style={S.LOADER} />
        }
      />
    </Screen>
  );
};
