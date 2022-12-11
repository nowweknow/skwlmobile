import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Image, SVGIcon } from 'components';
import { colors } from 'theme';

import * as S from './styles';

interface IVideoItemProps {
  id: number;
  product_image_link: string;
  pressClose?: (id: string) => void;
  onVideoPress?: () => void
  showCross: boolean
}

export const VideoItem = ({
  id,
  product_image_link,
  pressClose,
  onVideoPress,
  showCross = true
}: IVideoItemProps) => {
  return (
    <TouchableOpacity style={S.VIDEO} onPress={onVideoPress}>
      <Image height={206} source={{ uri: product_image_link }} />
      {showCross && (
        <TouchableOpacity style={S.ICON_CLOSE} onPress={() => pressClose(id)}>
          <SVGIcon size={14} name={'close'} color={colors.white} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
