import React, { useEffect, useRef, useState } from 'react';
import { Camera, useCameraDevices, VideoFile } from 'react-native-vision-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button, Screen, SVGIcon, Text } from 'components';
import { PermissionsAndroid, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from 'theme';
import { HomeNavigatorParams } from 'navigation';
import { HomeStack } from 'app/navigation/constans';
import { BottomButtons } from 'app/screens/recordVideo/components/bottomButtons';
import { ModalClose } from 'app/screens/recordVideo/components/modalClose';
import { FlashEnum, StatusRecordingEnum } from 'enum';
import { IVideoRecord } from 'types';

import * as S from './styles';

interface IProps {
  navigation: NativeStackNavigationProp<HomeNavigatorParams>;
}

export const RecordVideo = ({ navigation }: IProps) => {
  const devices = useCameraDevices();
  const cameraBack = devices.back;
  const cameraFront = devices.front;
  const camera = useRef<Camera>(null);
  const [cameraOn, setCameraOn] = useState<boolean>(false);
  const [permission, setPermission] = useState<boolean>(false);
  const [isCameraBack, setIsCameraBack] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<StatusRecordingEnum>(StatusRecordingEnum.NOT_RECORDING);
  const [videoData, setVideoData] = useState<IVideoRecord | null>(null);
  const [flashMode, setFlashMode] = useState<FlashEnum>(FlashEnum.FLASH_OFF);
  const [isCloseModal, setIsCloseModal] = useState<boolean>(false);

  const circularProgress: any = useRef(null);
  const [progressRef, setProgressRef] = useState(circularProgress);

  const toggleCamera = () => {
    setIsCameraBack(!isCameraBack);
  };

  const toggleFlash = () => {
    if (flashMode === FlashEnum.FLASH_ON) {
      setFlashMode(FlashEnum.FLASH_OFF);
    }
    if (flashMode === FlashEnum.FLASH_OFF) {
      setFlashMode(FlashEnum.FLASH_ON);
    }
  };

  const setVideoDataHandler = (video: VideoFile) => {
    if (video.duration && video.path) {
      setVideoData({
        duration: video.duration,
        path: video.path,
      });
    }
  };

  const limitVideoDuration = async (video: VideoFile) => {
    if (Math.floor(video.duration as number) < 0) {
      return;
    }
    if (Math.floor(video.duration as number) > 60) {
      await stopRecordVideo();
    }
    setVideoDataHandler(video);
  };

  const recordVideo = async () => {
    if (camera && camera.current) {
      setIsRecording(StatusRecordingEnum.RECORDING);
      camera.current.startRecording({
        onRecordingFinished: limitVideoDuration,
        onRecordingError: () => null,
        flash: flashMode,
      });
    }
  };

  const stopRecordVideo = async () => {
    if (camera && camera.current) {
      await camera.current.stopRecording();
      setIsRecording(StatusRecordingEnum.FINISHED_RECORDING);
    }
  };

  const navigateBackHandler = () => {
    navigation.navigate(HomeStack.newScreen);
  };

  const resetVideoHandler = () => {
    setVideoData(null);
    progressRef?.reAnimate(0);
  };

  const closeCamera = () => {
    if (videoData?.path) {
      setIsCloseModal(true);
    } else {
      navigateBackHandler();
    }
  };
  useEffect(() => {
    if (!cameraOn && permission) {
      setCameraOn(true);
    }
  }, [cameraOn, permission]);

  const getPermission = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    if (cameraPermission === 'authorized') {
      setPermission(true);
    }
  };

  const requestPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission().catch(error => console.warn('camera error:', error));
    if (newCameraPermission === 'authorized') {
      setPermission(true);
    }
  };

  useEffect(() => {
    getPermission();
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
  }, []);

  if (!permission) {
    return (
      <View style={S.CENTERED}>
        <Text>No permission</Text>
        <Button onPress={requestPermission} text={'get permission'} />
      </View>
    );
  }

  if (!cameraBack || !cameraFront) {
    return (
      <View style={S.CENTERED}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <Screen style={S.CONTAINER} safePaddingTop={true}>
      <TouchableOpacity style={S.CLOSE} onPress={closeCamera}>
        <SVGIcon name={'close'} color={colors.white} />
      </TouchableOpacity>

      <Camera
        ref={camera}
        accessibilityViewIsModal={true}
        style={[StyleSheet.absoluteFill, S.CAMERA]}
        device={isCameraBack ? cameraBack : cameraFront}
        isActive={true}
        photo={true}
        video={true}
      />
      <View style={S.BUTTONS}>
        <BottomButtons
          isRecording={isRecording}
          stopRecordVideo={stopRecordVideo}
          toggleCamera={toggleCamera}
          recordVideo={recordVideo}
          flashMode={flashMode}
          toggleFlash={toggleFlash}
          videoData={videoData}
          navigation={navigation}
          isCameraBack={isCameraBack}
          progressRef={progressRef}
          setProgressRef={setProgressRef}
        />
      </View>
      {isCloseModal && (
        <ModalClose isShow={isCloseModal} setIsShowModal={setIsCloseModal} closeHandler={navigateBackHandler} resetHandler={resetVideoHandler} />
      )}
    </Screen>
  );
};
