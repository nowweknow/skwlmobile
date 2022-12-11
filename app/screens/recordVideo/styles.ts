import {ViewStyle} from 'react-native';

export const CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export const CLOSE: ViewStyle = {
  alignSelf: 'flex-start',
  marginLeft: 18,
  marginTop: 18,
  zIndex: 21,
  flexDirection: 'row',
};

export const BUTTONS: ViewStyle = {
  zIndex: 2,
};
export const CAMERA: ViewStyle = {
  zIndex: 2,
};

export const CENTERED: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
};
