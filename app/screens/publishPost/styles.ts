import {TextStyle, ViewStyle} from 'react-native';
import {colors} from 'theme';

export const TEXTAREA_CONTAINER: ViewStyle = {
  backgroundColor: colors.clouds,
  borderRadius: 5,
  padding: 5,
  flex: 1,
};

export const TEXTAREA: TextStyle = {
  height: 150,
  justifyContent: 'flex-start',
  flexDirection: 'row',
  textAlignVertical: 'top',
};

export const HASHTAGS: TextStyle = {
  minHeight: 40,
  maxHeight: 100,
};

export const PUBLISH: ViewStyle = {
  paddingVertical: 11,
  paddingHorizontal: 24,
  alignSelf: 'flex-end',
};
export const VIDEO_POSTER_WRAPPER: ViewStyle = {
  width: 139,
  height: 216,
  borderRadius: 5,
  overflow: 'hidden',
};
export const VIDEO_POSTER: ViewStyle = {
  width: '100%',
  height: '100%',
};
