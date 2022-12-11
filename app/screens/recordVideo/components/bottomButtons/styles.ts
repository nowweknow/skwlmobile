import {ViewStyle} from 'react-native';
import {colors} from 'theme';

export const BUTTONS: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 30,
  zIndex: 2,
};

export const RECORD_CIRCLE: ViewStyle = {
  position: 'relative',
  width: 40,
  height: 40,
  borderRadius: 30,
  backgroundColor: colors.red,
  justifyContent: 'center',
  alignItems: 'center',
};

export const BUTTON_LEFT: ViewStyle = {
  position: 'absolute',
  left: 80,
};

export const BUTTON_RIGHT: ViewStyle = {
  position: 'absolute',
  right: 70,
};

export const BUTTON_NEXT: ViewStyle = {
  padding: 15,
  width: 48,
  height: 48,
  borderRadius: 24,
};

export const ICON_BOX: ViewStyle = {
  width: 48,
  height: 48,
  justifyContent: 'center',
};
