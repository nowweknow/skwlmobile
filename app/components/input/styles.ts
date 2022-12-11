import {TextStyle, ViewStyle} from 'react-native';
import {colors} from 'theme';

export const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  height: 54,
  borderRadius: 4,
  backgroundColor: colors.clouds,
};

export const ICON_LEFT: ViewStyle = {
  marginRight: 8,
};

export const INPUT: ViewStyle = {
  flex: 1,
};

export const TEXT: TextStyle = {
  fontSize: 16,
  lineHeight: 22,
};
