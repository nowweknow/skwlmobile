import {TextStyle, ViewStyle} from 'react-native';

import {colors} from 'theme';
import {SCREEN_WIDTH} from 'variables';

export const TEXT_BLOCK: ViewStyle = {
  marginTop: 12,
  paddingHorizontal: 48,
};

export const TEXT: TextStyle = {
  textAlign: 'center',
};

export const TARIFF: ViewStyle = {
  paddingVertical: 16,
  paddingHorizontal: 26,
  borderRadius: 5,
  borderWidth: 2,
  borderColor: colors.accent,
  height: 215,
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export const TARIFF_LABEL: ViewStyle = {
  backgroundColor: colors.accent,
  paddingHorizontal: 18,
  paddingVertical: 8,
  alignSelf: 'flex-start',
  borderRadius: 8,
};

export const TARIFF_TEXT: TextStyle = {
  color: colors.white,
};

export const OPTIONS: ViewStyle = {
  marginTop: 14,
};

export const BILLING: ViewStyle = {
  height: 54,
  paddingHorizontal: 15,
  width: SCREEN_WIDTH - 36,
  justifyContent: 'flex-start',
  marginTop: 8,
  borderColor: colors.accent,
  borderWidth: 1,
  backgroundColor: colors.accentBg,
};

export const TEXT_TARIFF: ViewStyle = {
  flexDirection: 'row',
};

export const NEXT: ViewStyle = {
  paddingVertical: 11,
  paddingHorizontal: 24,
  alignSelf: 'flex-end',
};

export const NEXT_DISABLED: ViewStyle = {
  paddingVertical: 11,
  paddingHorizontal: 24,
  backgroundColor: colors.grey1,
  alignSelf: 'flex-end',
};
