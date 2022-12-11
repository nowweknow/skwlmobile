import {TextStyle, ViewStyle} from 'react-native';
import {colors} from 'theme';

export const CONTAINER: ViewStyle = {
  marginTop: 4,
};

export const WRAPPER: ViewStyle = {
  backgroundColor: colors.darkGreyOpacity,
};

export const CONTENT: ViewStyle = {
  paddingHorizontal: 18,
  height: 180,
};

export const DRAGGABLE_ICON: ViewStyle = {
  backgroundColor: colors.black,
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
