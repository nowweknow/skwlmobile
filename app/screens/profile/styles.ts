import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {colors} from 'theme';

export const CONTAINER: ViewStyle = {
  flex: 1,
};

export const IMAGE_BG: ViewStyle = {
  height: 175,
  paddingTop: 37,
};

export const PROFILE_PHOTO_CONTAINER: ViewStyle = {
  alignItems: 'center',
  marginTop: 20,
};

export const PROFILE_PHOTO: ImageStyle = {
  borderRadius: 50,
};

export const PROFILE_INFO: ViewStyle = {
  marginTop: 60,
  flexDirection: 'column',
};
export const PROFILE_TITLE: ViewStyle = {
  alignItems: 'center',
};

export const PROFILE_TEXT: TextStyle = {
  textAlign: 'center',
  width: '50%',
};

export const PROFILE_DESC: TextStyle = {
  textAlign: 'center',
  width: '70%',
  marginTop: 8,
};

export const STATISTIC: ViewStyle = {
  marginTop: 12,
  backgroundColor: colors.clouds,
  borderRadius: 5,
  padding: 26,
  flexDirection: 'row',
  justifyContent: 'space-between',
};

export const STATISTIC_COL: ViewStyle = {
  alignItems: 'center',
};

export const STATISTIC_TEXT: TextStyle = {
  marginTop: 6,
};

export const STATISTIC_COL_MARGIN: ViewStyle = {
  marginRight: 12,
};

export const TABS: ViewStyle = {
  flexDirection: 'row',
  marginBottom: 8,
  paddingHorizontal: 16,
};

export const TABS_BUTTON: ViewStyle = {
  marginRight: 12,
  padding: 12,
  justifyContent: 'center',
  alignItems: 'center',
};

export const TABS_BUTTON_TEXT: TextStyle = {
  color: colors.grey1,
};

export const ACTIVE_TAB: TextStyle = {
  color: colors.black,
};

export const ITEM_CONTENT: ViewStyle = {
  justifyContent: 'space-between',
  paddingHorizontal: 18,
};

export const NO_ITEM: ViewStyle = {
  flex:1,
  justifyContent: 'center',
  alignItems:'center',
  top:'10%'

};

export const AVATAR: ViewStyle = {
  width: 96,
  height: 96,
};

export const UPLOAD_BUTTON: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  backgroundColor: colors.concrete,
  borderRadius: 21,
  width: 27,
  height: 27,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
  alignSelf: 'flex-end',
};

export const SPINNER: ViewStyle = {
  width: '100%',
};

export const UPLOAD_BG: ViewStyle = {
  alignItems: 'flex-end',
  paddingRight: 2,
  marginTop: 10,
};
