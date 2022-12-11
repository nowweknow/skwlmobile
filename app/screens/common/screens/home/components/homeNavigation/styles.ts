import {TextStyle, ViewStyle} from 'react-native';
import {colors} from 'theme';

export const HEADER: ViewStyle = {
  backgroundColor: 'transparent',
  paddingTop: 40,
  paddingHorizontal: 15,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

export const BTN: ViewStyle = {
  paddingVertical: 4,
  paddingHorizontal: 20,
};

export const BTN_TEXT: TextStyle = {
  opacity: 1,
};

export const BTN_TEXT_ACCENT: TextStyle = {
  opacity: 1,
  color: colors.accent,
};

export const BTN_TEXT_OPACITY: TextStyle = {
  opacity: 0.6,
  color: colors.white,
};

export const BTN_TEXT_GREY: TextStyle = {
  opacity: 0.6,
  color: colors.black,
};
