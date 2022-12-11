import React from 'react';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import {HomeCommon} from 'app/screens/common/screens/home';
import {useSelector} from 'hooks';
import {getNewVideo, getNewVideoAuth} from 'app/redux/reducers/home/actionCreators';
import {clearVideos, setVideos} from 'app/redux/reducers/home/homeSlice';

export const NewScreen = () => {
  const {videos, isLoading} = useSelector(state => state.home);
  const {isLogged} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const loadNewVideos = (page: number) => {
    if (isLogged) {
      dispatch(getNewVideoAuth(page));
    } else {
      dispatch(getNewVideo(page));
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setVideos([]));
      loadNewVideos(1)
      return () => {
        dispatch(clearVideos());
      };
    }, []),
  );

  return <HomeCommon {...{ loadNewVideos, isVideosLoading: isLoading }} videos={videos} />;
};
