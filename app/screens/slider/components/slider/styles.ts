import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'variables';
import { colors } from 'theme';

export const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

export const ICON_CENTERED: ViewStyle = {
  flexDirection: 'column',
  alignItems: 'center',
};

export const IMAGE_SLIDE4: ImageStyle = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

export const CONTAINER_SCREEN5: ViewStyle = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: colors.yellow,
  paddingTop: 72,
  flex: 1,
};

export const IMAGE_SLIDE5: ImageStyle = {
  width: SCREEN_WIDTH,
};

export const BTN_BLOCK: ImageStyle = {
  paddingHorizontal: 20,
  paddingBottom: 32,
};

export const BTN: ViewStyle = {
  paddingVertical: 16,
};

export const BTN_TEXT: TextStyle = {
  fontWeight: '700',
};

export const LOGO: ImageStyle = {
  width: 155,
  height: 130,
};

export const LOGO2: ImageStyle = {
  width: 132,
  height: 120,
};

export const SLIDE2: ImageStyle = {
  width: 274,
  height: 85,
}

export const LOGO3: ImageStyle = {
  width: 104,
  height: 90,
};

export const SLIDE3: ImageStyle = {
  width: 315,
  height: 196,
};