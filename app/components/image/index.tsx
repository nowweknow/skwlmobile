import React from 'react';
import {Image as _Image, ImageResizeMode, ImageSourcePropType, ImageStyle, StyleProp} from 'react-native';

import * as S from 'app/components/image/styles';

interface IProps {
  width?: number;
  height?: number;
  size?: number;
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  shape?: 'default' | 'circle';
  resizeMode?: ImageResizeMode;
}
export const Image = (props: IProps) => {
  const {width, height, source, style, size, shape = 'default', resizeMode} = props;
  return (
    <_Image resizeMode={resizeMode} style={[shape === 'circle' ? S.CIRCLE : S.DEFAULT, style]} width={size || width} height={size || height} source={source} />
  );
};
