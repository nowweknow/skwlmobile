import { ImageStyle, ViewStyle } from 'react-native';
import { colors } from 'theme';

export const ITEM_CTR: ViewStyle = {
  flex: 1,
};

export const DOT: ViewStyle = {
  height: 6,
  width: 6,
  borderRadius: 3,
  backgroundColor: colors.white,
};

export const ACTIVE_DOT: ViewStyle = {
  ...DOT,
  backgroundColor: colors.white,
};
