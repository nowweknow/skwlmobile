import React, { FC, useCallback } from 'react';
import { Image, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button, MarginTopBlock } from 'components';
import { SliderStack } from 'app/navigation/constans';
import { AppNavigatorParams } from 'navigation';

import * as S from './styles';
import { useDispatch } from 'react-redux';
import { setIsOnboardingSeen } from 'app/redux/reducers/profile/profileSlice';

type SliderProp = {
  id: string;
  navigation: NativeStackNavigationProp<AppNavigatorParams>;
};

export const Slider: FC<SliderProp> = props => {
  const { id, navigation } = props;
  const dispatch = useDispatch()

  const navigateSignUp = useCallback(() => {
    dispatch(setIsOnboardingSeen(true))
    navigation.navigate(SliderStack.bottomTabs);
  }, [navigation]);

  const ScreenContent1 = React.memo(() => {
    return (
      <View style={S.ICON_CENTERED}>
        <Image style={S.LOGO} source={require('../../img/new-logo.png')} />
        <MarginTopBlock marginTop={24}>
          <Image style={S.SLIDE2} source={require('../../img/slide1.png')} />
        </MarginTopBlock>
      </View>
    );
  });

  const ScreenContent2 = React.memo(() => {
    return (
      <View style={S.ICON_CENTERED}>
        <Image style={S.LOGO2} source={require('../../img/new-logo.png')} />
      </View>
    );
  });

  const ScreenContent3 = React.memo(() => {
    return (
      <View style={S.ICON_CENTERED}>
        <Image style={S.LOGO3} source={require('../../img/new-logo.png')} />
        <MarginTopBlock marginTop={84}>
          <Image style={S.SLIDE3} source={require('../../img/slide3.png')} />
        </MarginTopBlock>
      </View>
    );
  });

  const ScreenContent4 = React.memo(() => {
    return (
      <View style={S.CONTAINER_SCREEN5}>
        <Image resizeMode="cover" style={S.IMAGE_SLIDE4} source={require('../../img/slide4.png')} />
      </View>
    );
  });

  const ScreenContent5 = React.memo(() => {
    return (
      <View style={S.CONTAINER_SCREEN5}>
        <Image resizeMode="stretch" height={548} style={S.IMAGE_SLIDE5} source={require('../../img/slide5.png')} />
        <View style={S.BTN_BLOCK}>
          <Button fullWith={true} isCentered={true} activeOpacity={0.8} style={S.BTN} textStyle={S.BTN_TEXT} text="LETS START" onPress={navigateSignUp} />
        </View>
      </View>
    );
  });

  const renderContent = () => {
    switch (id) {
      case '1': {
        return <ScreenContent1 />;
      }
      case '2':
        return <ScreenContent2 />;

      case '3': {
        return <ScreenContent3 />;
      }
      case '4': {
        return <ScreenContent4 />;
      }
      case '5': {
        return <ScreenContent5 />;
      }
      default: {
        return <ScreenContent1 />;
      }
    }
  };

  return <View style={S.CONTAINER}>{renderContent()}</View>;
};
