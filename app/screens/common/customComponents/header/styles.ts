import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export const HEADER: ViewStyle = {
  position: 'relative',
  flexDirection: 'row',
  marginTop: 18,
};
export const TITLE_TEXT: TextStyle = {
  textAlign: 'center',
  alignSelf: 'center',
  flex: 1,
};

export const ICON_LEFT: ImageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
};

export const ICON_RIGHT: ImageStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
};
