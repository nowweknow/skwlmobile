import React, {useRef} from 'react';
import {Easing, GestureResponderEvent, TouchableOpacity, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Button, SVGIcon} from 'components';
import {colors} from 'theme';

import {HomeNavigatorParams} from 'navigation';
import {HomeStack} from 'app/navigation/constans';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {FlashEnum, StatusRecordingEnum} from 'enum';
import {IVideoRecord} from 'types';

import * as S from './styles';

interface IProps {
  toggleCamera: (isCameraBack: GestureResponderEvent) => void;
  recordVideo: () => void;
  stopRecordVideo: () => void;
  flashMode: FlashEnum;
  isRecording: StatusRecordingEnum;
  toggleFlash: () => void;
  videoData: IVideoRecord | null;
  navigation: NativeStackNavigationProp<HomeNavigatorParams>;
  isCameraBack: boolean;
  progressRef: any;
  setProgressRef: (progressRef: any) => void;
}
export const BottomButtons = (props: IProps) => {
  const {toggleCamera, recordVideo, flashMode, stopRecordVideo, toggleFlash, videoData, isCameraBack, navigation, progressRef, setProgressRef} = props;
  const timerRef: any = useRef(null);
  const animationDurationMs = 60000;

  const navigatePublicPost = () => {
    navigation.navigate(HomeStack.publishPostScreen, {
      path: videoData!.path,
    });
  };

  const recordVideoHandler = async () => {
    timerRef.current = +new Date();
    await recordVideo();
    await progressRef?.reAnimate(0);
    await progressRef.animate(100, animationDurationMs, Easing.linear);
  };

  const stopRecordHandler = () => {
    const seconds = new Date(+new Date() - timerRef.current).getSeconds();
    const percentage = seconds / (60 / 100);
    if (progressRef) {
      progressRef.animate(percentage, 0, Easing.linear);
    }
    stopRecordVideo();
  };

  return (
    <View style={S.BUTTONS}>
      {isCameraBack ? (
        <TouchableOpacity onPress={toggleFlash} activeOpacity={0} style={[S.ICON_BOX, S.BUTTON_LEFT]}>
          <SVGIcon name={'cameraFlash'} size={32} color={flashMode === FlashEnum.FLASH_ON ? colors.yellow : colors.white} />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      <TouchableOpacity onPressOut={stopRecordHandler} onPressIn={recordVideoHandler} activeOpacity={1}>
        <AnimatedCircularProgress
          ref={ref => setProgressRef(ref)}
          rotation={360}
          duration={60000}
          style={S.RECORD_CIRCLE}
          size={65}
          width={5}
          fill={0}
          tintColor={colors.red}
          onAnimationComplete={() => {}}
          backgroundColor={colors.lightGreyOpacity}
        />
      </TouchableOpacity>
      <View style={S.BUTTON_RIGHT}>
        {videoData && videoData.path ? (
          <TouchableOpacity>
            <Button isCentered={true} onPress={navigatePublicPost} preset={'rounded'} style={S.BUTTON_NEXT}>
              <SVGIcon name={'arrowRight'} size={10} />
            </Button>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleCamera} style={S.ICON_BOX}>
            <SVGIcon name={'cameraSwitch'} size={32} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
