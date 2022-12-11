import {ViewStyle, TextStyle} from 'react-native';

import {colors} from 'theme';

const PRIMARY_VIEW: ViewStyle = {
  paddingHorizontal: 24,
  paddingVertical: 11,
  borderRadius: 5,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.accent,
  alignSelf: 'flex-start',
};

const PRIMARY_TEXT: TextStyle = {
  color: colors.white,
  fontSize: 16,
  lineHeight: 22,
};

const ROUNDED_VIEW: ViewStyle = {
  paddingHorizontal: 21,
  paddingVertical: 15,
  borderRadius: 8,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.accent,
};

const SECONDARY_VIEW: ViewStyle = {
  ...PRIMARY_VIEW,
  paddingHorizontal: 38,
  paddingVertical: 7,
};

const SECONDARY_TEXT: TextStyle = {
  color: colors.white,
  fontSize: 14,
  lineHeight: 22,
  fontWeight: '600',
  textAlign: 'center',
};

const FOLLOW_VIEW: ViewStyle = {
  backgroundColor: colors.accent,
  paddingHorizontal: 14,
  paddingVertical: 4,
  borderRadius: 8,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const FOLLOW_TEXT: TextStyle = {
  color: colors.white,
  fontSize: 14,
  lineHeight: 20,
  textAlign: 'center',
};

const DISABLED_TEXT: TextStyle = {
  fontSize: 14,
  lineHeight: 22,
  fontWeight: '400',
  textAlign: 'center',
};

export const viewPresets: {
  primary: ViewStyle;
  rounded: ViewStyle;
  primaryLined: ViewStyle;
  primaryLight: ViewStyle;
  primaryDisabled: ViewStyle;
  primaryLoading: ViewStyle;
  primaryText: ViewStyle;
  roundedLight: ViewStyle;
  roundedLine: ViewStyle;
  roundedDisabled: ViewStyle;
  roundedText: ViewStyle;
  secondary: ViewStyle;
  secondaryDisabled: ViewStyle;
  secondaryLoad: ViewStyle;
  follow: ViewStyle;
  unfollow: ViewStyle;
  underline: TextStyle;
  text: TextStyle;
  disabled: ViewStyle;
} = {
  primary: {
    ...PRIMARY_VIEW,
    backgroundColor: colors.accent,
  },
  primaryLined: {
    ...PRIMARY_VIEW,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  primaryLight: {
    ...PRIMARY_VIEW,
    backgroundColor: colors.clouds,
  },
  primaryDisabled: {
    ...PRIMARY_VIEW,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  primaryLoading: {
    ...PRIMARY_VIEW,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  primaryText: {
    ...PRIMARY_VIEW,
    backgroundColor: 'transparent',
    borderColor: colors.accent,
  },
  rounded: {...ROUNDED_VIEW},
  roundedLight: {...ROUNDED_VIEW, backgroundColor: colors.clouds},
  roundedLine: {...ROUNDED_VIEW, borderWidth: 1, borderColor: colors.accent},
  roundedDisabled: {
    ...ROUNDED_VIEW,
    borderWidth: 1,
    borderColor: colors.concrete,
  },
  roundedText: {...ROUNDED_VIEW, backgroundColor: 'transparent'},
  secondary: {...SECONDARY_VIEW},
  secondaryDisabled: {...SECONDARY_VIEW, backgroundColor: colors.grey4},
  secondaryLoad: {...SECONDARY_VIEW, backgroundColor: colors.black},
  follow: {...FOLLOW_VIEW},
  unfollow: {
    ...FOLLOW_VIEW,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.black,
  },
  underline: {},
  text: {},
  disabled: {...SECONDARY_VIEW, backgroundColor: colors.clouds},
};

export const textPresets: {
  primary: TextStyle;
  primaryLight: TextStyle;
  primaryLined: TextStyle;
  primaryDisabled: TextStyle;
  primaryLoading: TextStyle;
  primaryText: TextStyle;
  secondary: TextStyle;
  secondaryDisabled: TextStyle;
  secondaryLoad: TextStyle;
  rounded: TextStyle;
  roundedLight: TextStyle;
  roundedLine: TextStyle;
  roundedDisabled: TextStyle;
  roundedText: TextStyle;
  follow: TextStyle;
  unfollow: TextStyle;
  underline: TextStyle;
  text: TextStyle;
  disabled: TextStyle;
} = {
  primary: {...PRIMARY_TEXT},
  primaryLight: {
    ...PRIMARY_TEXT,
    color: colors.silver,
  },
  primaryLined: {
    ...PRIMARY_TEXT,
    color: colors.accent,
  },
  primaryDisabled: {
    ...PRIMARY_TEXT,
    color: colors.concrete,
  },
  primaryLoading: {
    ...PRIMARY_TEXT,
    color: colors.concrete,
  },
  primaryText: {
    ...PRIMARY_TEXT,
    color: colors.concrete,
  },
  secondary: {
    ...SECONDARY_TEXT,
  },
  secondaryDisabled: {
    ...SECONDARY_TEXT,
    color: colors.grey1,
  },
  secondaryLoad: {
    ...SECONDARY_TEXT,
    color: colors.white,
  },
  rounded: {},
  roundedLight: {},
  roundedLine: {},
  roundedDisabled: {},
  roundedText: {},
  follow: {...FOLLOW_TEXT},
  unfollow: {
    ...FOLLOW_TEXT,
    color: colors.black,
  },
  underline: {
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  disabled: {
    ...DISABLED_TEXT,
    color: colors.concrete,
  },
};

export type ButtonPresetNames = keyof typeof viewPresets;
