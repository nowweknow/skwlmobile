import React from 'react';
import { useDispatch } from 'react-redux';

import { HomeCommon } from 'app/screens/common/screens/home';
import { useSelector } from 'hooks';
import { getTrendingVideo, getTrendingVideoAuth } from 'app/redux/reducers/home/actionCreators';
import { clearVideos, setVideos } from 'app/redux/reducers/home/homeSlice';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';
import { IVideoResponse } from 'types';
import { HomeStackRouteProps } from 'navigation';
import { HomeStack } from 'app/navigation/constans';
import { api } from 'app/api';
import { video } from 'app/redux/selectors';

export const TrendingScreen = () => {
  const [sharedVideo, setSharedVideo] = useState<IVideoResponse | null>(null)
  const { videos, isLoading } = useSelector(state => state.home);
  const { isLogged } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const route = useRoute<HomeStackRouteProps<HomeStack.trendingScreen>>()

  useEffect(() => {
    if (route.params) {
      api.getVideoByIdAuth(route.params.sharedVideoId as number).then(res => {
        setSharedVideo(res.data)
      })
    }
  }, [route.params])

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setVideos([]));
      loadNewVideos(1)
      return () => {
        dispatch(clearVideos());
      };
    }, []),
  );

  const loadNewVideos = (page: number) => {
    if (isLogged) {
      dispatch(getTrendingVideoAuth(page));
    } else {
      dispatch(getTrendingVideo(page));
    }
  }

  return <HomeCommon {...{ loadNewVideos, isVideosLoading: isLoading }} videos={(sharedVideo && [sharedVideo]) || videos} />;
};
