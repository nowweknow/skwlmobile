import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIsFocused, useRoute } from '@react-navigation/native';

import { HomeCommon } from 'app/screens/common/screens/home';
import { IVideoResponse } from 'types';
import { api } from 'app/api';

export const WatchVideoScreen = () => {
  const [video, setVideo] = useState<IVideoResponse | null>(null)
  const route = useRoute()
  const isScreenFocused = useIsFocused()

  useEffect(() => {
    api.getVideoByIdAuth(route.params.videoId).then((res) => {
      setVideo(res.data)
    })
  }, [route.params])

  useEffect(() => {
    if (!isScreenFocused)
      setVideo(null)
  }, [isScreenFocused])
  return <>
    {video && <HomeCommon
      isBackButton
      videos={[video]}
      setVideo={(newVideo: IVideoResponse) => {setVideo(newVideo)}}
    />}
  </>;
};
