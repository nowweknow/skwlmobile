import React, {FC, useRef, useState} from 'react';
import {View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Screen} from 'components';
import {AppNavigatorParams} from 'navigation';
import {colors} from 'theme';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from 'variables';

import {Slider} from './components';
import * as S from './styles';

const data: ISlider[] = [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}, {id: '5'}];

interface ISlider {
  id: string;
}

export const OnboardScreen: FC<NativeStackScreenProps<AppNavigatorParams>> = ({navigation}) => {
  const carousel = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const renderItem = ({item}: {item: ISlider}) => {
    return (
      <View style={[S.ITEM_CTR]} key={item.id}>
        <Slider id={item.id} navigation={navigation} />
      </View>
    );
  };

  return (
    <Screen backgroundColor={colors.accent} safePaddingTop={false} safePaddingBottom={false}>
      <Carousel
        ref={carousel}
        data={data}
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={SCREEN_HEIGHT}
        itemWidth={SCREEN_WIDTH}
        autoplay={true}
        autoplayInterval={2000}
        onSnapToItem={index => setSlideIndex(index)}
        firstItem={slideIndex ? slideIndex : 0}
        renderItem={item => renderItem(item)}
        activeAnimationType="spring"
      />
      {/*{slideIndex !== data.length - 1 && (*/}
      {/*  <Pagination*/}
      {/*    dotsLength={data.length ? data.length : 0}*/}
      {/*    activeDotIndex={slideIndex ? slideIndex : 0}*/}
      {/*    dotStyle={S.ACTIVE_DOT}*/}
      {/*    inactiveDotScale={1}*/}
      {/*    inactiveDotStyle={S.DOT}*/}
      {/*  />*/}
      {/*)}*/}
    </Screen>
  );
};
