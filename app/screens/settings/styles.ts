import {TextStyle, ViewStyle} from 'react-native';
import {colors} from 'theme';

export const CONTAINER: ViewStyle = {
  marginTop: 29,
};

export const HEADER: ViewStyle = {
  marginTop: 18,
};

export const BUTTON: ViewStyle = {
  marginBottom: 8,
  backgroundColor: colors.clouds,
  paddingVertical: 16,
  borderRadius: 4,
  justifyContent: 'flex-start',
};

export const BUTTON_TEXT: TextStyle = {
  color: colors.black,
  textAlign: 'left',
  fontSize: 16,
  lineHeight: 22,
};
