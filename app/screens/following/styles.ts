import {ImageStyle, ViewStyle} from 'react-native';
import {colors} from 'theme';

export const CONTAINER: ViewStyle = {
  paddingHorizontal: 18,

  justifyContent: 'space-between',
};

export const HEADER: ViewStyle = {
  marginBottom: 18,
};

export const USER_CONTAINER: ViewStyle = {
  width: '49%',
  height: 223,
  backgroundColor: colors.grey6,
  marginBottom: 10,
  borderRadius: 5,
  overflow: 'visible',
};

export const USER_INFO: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const IMAGE_BG: ImageStyle = {
  alignItems: 'center',
  height: 75,
  borderRadius: 50,
};

export const IMAGE: ImageStyle = {
  borderColor: colors.clouds,
  borderWidth: 2,
  marginTop: 38,
};

export const ITEM: ViewStyle = {
  justifyContent: 'space-between',
  paddingHorizontal: 18,
};
