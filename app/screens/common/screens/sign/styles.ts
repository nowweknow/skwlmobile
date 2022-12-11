import {TextStyle, ViewStyle} from 'react-native';
import {colors} from 'theme';

export const CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const BTN_CLOSE: ViewStyle = {
  alignSelf: 'flex-end',
  marginRight: 18,
  marginTop: 18,
};

export const TITLE: TextStyle = {
  alignItems: 'center',
  marginBottom: 12,
};

export const SUBTITLE: TextStyle = {
  color: colors.grey,
  textAlign: 'center',
  paddingHorizontal: 38,
  letterSpacing: 0.6,
};

export const CONTINUE_BLOCK: ViewStyle = {
  width: '100%',
  justifyContent: 'center',
  paddingHorizontal: 24,
};
export const BUTTON: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.grey4,
  backgroundColor: 'transparent',
};

export const BUTTON_TEXT: TextStyle = {
  fontSize: 14,
  color: colors.black,
  fontWeight: '600',
};

export const ACCOUNT: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
};

export const FOOTER: ViewStyle = {
  marginHorizontal: 12,
  marginBottom: 40,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

export const FOOTER_TEXT: TextStyle = {
  lineHeight: 18,
  fontSize: 13,
};
