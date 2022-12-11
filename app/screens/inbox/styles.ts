import {TextStyle, ViewStyle} from 'react-native';
import {colors} from 'theme';

export const CONTAINER: ViewStyle = {
  paddingRight: 18,
  paddingLeft: 18,
};

export const TOGGLE_BLOCK: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 18,
};

export const TOGGLE_BUTTON: ViewStyle = {
  width: '50%',
};

export const TAB_TEXT: TextStyle = {
  textAlign: 'center',
};

export const TAB_ACTIVE: TextStyle = {
  color: colors.accent,
};

export const MESSAGE: ViewStyle = {
  flexDirection: 'row',
  marginTop: 8,
  padding: 8,
};

export const MESSAGE_INFO: ViewStyle = {
  flexDirection: 'column',
  marginLeft: 10,
  flex: 1,
};

export const MESSAGE_TEXT: TextStyle = {
  marginTop: 6,
  flexWrap: 'wrap',
  flexDirection: 'row',
};
