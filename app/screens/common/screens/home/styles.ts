import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { colors } from 'theme';

export const CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingBottom: 5,
};
export const LOADER: ViewStyle = {
  flex: 1,
};

export const VIDEO: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  alignItems: 'stretch',
  bottom: 0,
  right: 0,
  zIndex: -1,
};

export const ROW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const ROW_END: ViewStyle = {
  justifyContent: 'flex-end',
};

export const PRODUCT: ViewStyle = {
  alignItems: 'flex-end',
  marginBottom: 18,
};

export const PRODUCT_PHOTO: ImageStyle = {
  borderWidth: 2,
  borderColor: colors.white,
};
export const FLEX_1: ViewStyle = {
  flex: 1
}
export const FLEX = (n: number): ViewStyle => ({
  flex: n
})
export const TAGS_WRAPPER: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
};

export const TAGS: TextStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 3,
  color: colors.white,
  marginRight: 10,
};

export const ICON: ViewStyle = {
  width: 48,
  justifyContent: 'center',
  alignItems: 'center',
};

export const ICON_TEXT: TextStyle = {
  textAlign: 'center',
  marginTop: 6,
  marginBottom: 9,
  color: colors.white,

  width: 36,
};

export const DESCRIPTION: TextStyle = {
  color: colors.white,
  marginTop: 11,
};

export const PROFILE_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  flex:1
};

export const PROFILE_PHOTO: ImageStyle = {
  borderRadius: 14,
};

export const PROFILE: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  flex:1,
  marginTop: 5,
};

export const PROFILE_NAME: TextStyle = {
  color: colors.white,
  marginLeft: 10,
  marginRight: 5,
  flex:1,
};

export const PROFILE_BTN: ViewStyle = {
  borderWidth: 1,
  borderRadius: 2,
  borderColor: colors.whiteOpacity,
  paddingVertical: 2,
  paddingHorizontal: 8,
  marginLeft: 6,
};

export const PROFILE_BTN_TEXT: TextStyle = {
  color: colors.white,
  fontSize: 10,
  fontWeight: '600',
};

export const SHARE: ViewStyle = {
  alignSelf: 'flex-end',
  marginBottom: 12,
};

export const BACK: ViewStyle = {
  marginTop: 60,
  marginLeft: 20,
};
