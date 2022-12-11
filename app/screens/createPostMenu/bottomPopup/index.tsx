import React, { useCallback, useEffect, useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImagePicker, { Video } from 'react-native-image-crop-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button, SVGIcon } from 'components';
import { colors } from 'theme';
import { CreatePostStack, HomeStack } from 'app/navigation/constans';
import { AppNavigatorParams, HomeNavigatorParams } from 'navigation';

import * as S from './styles';

export const BottomPopup = React.forwardRef((props: {isDisabled?: boolean}, ref: any) => {
  const [timeoutID, setTimeoutId] = useState<number | null>(null)
  const [galleryVideoData, setGalleryVideoData] = useState<Video>();
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParams & HomeNavigatorParams>>();

  const navigateRecordVideo = () => {
    ref?.current?.close();
    navigation.navigate(CreatePostStack.recordVideoScreen);
  };

  useEffect(()=> () => (timeoutID ? clearTimeout(timeoutID) : void 0), [])

  const navigatePublishScreen = useCallback(() => {
    if (galleryVideoData?.path) {
      navigation.navigate(HomeStack.publishPostScreen, {
        path: galleryVideoData?.path,
      });
    }
  }, [galleryVideoData?.path, navigation]);

  const launchVideoGallery = () => {
    if (timeoutID) clearTimeout(timeoutID)
    setTimeoutId(
      setTimeout(() => {
        ImagePicker.openPicker({
          mediaType: 'video',
        })
          .then(res => setGalleryVideoData(res))
          .catch(e => console.log(e))
      }, 500)
    )

    ref?.current?.close();
  };

  useEffect(() => {
    if (galleryVideoData?.path) {
      navigatePublishScreen();
    }
  }, [galleryVideoData, navigatePublishScreen, navigation]);

  return (
    <View style={S.CONTAINER}>
      <TouchableOpacity disabled={props?.isDisabled} onPress={() => ref?.current?.open()}>
        <SVGIcon name={'addTab'} size={40} color={colors.red} />
      </TouchableOpacity>
      <RBSheet
        minClosingHeight={200}
        ref={ref}
        closeOnDragDown={true}
        closeOnPressMask
        customStyles={{
          wrapper: S.WRAPPER,
          container: S.CONTENT,
          draggableIcon: S.DRAGGABLE_ICON,
        }}>
        <Button
          onPress={navigateRecordVideo}
          style={S.BUTTON}
          textStyle={S.BUTTON_TEXT}
          iconColor={colors.grey1}
          iconRight={'arrowRight'}
          text={'Record a video'}
          fullWith={true}
        />
        <Button
          onPress={launchVideoGallery}
          style={S.BUTTON}
          textStyle={S.BUTTON_TEXT}
          iconColor={colors.grey1}
          iconRight={'arrowRight'}
          text={'Choose from gallery'}
          fullWith={true}
        />
      </RBSheet>
    </View>
  );
});
