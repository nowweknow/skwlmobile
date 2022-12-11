import {TextStyle, ViewStyle} from 'react-native';
import {colors} from 'theme';

export const HEADER: ViewStyle = {
  marginTop: 18,
};

export const CONTENT: ViewStyle = {
  marginTop: 36,
  marginBottom: 20,
};

export const TAG_BLOCK: ViewStyle = {
  flexDirection: 'row',
};

export const TAG_BOX: ViewStyle = {
  borderColor: colors.grey4,
  borderWidth: 1,
  padding: 36,
  backgroundColor: colors.clouds,
  borderRadius: 3,
  marginRight: 16,
};

export const TAG_INFO: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export const BUTTON: ViewStyle = {
  backgroundColor: colors.white,
  borderWidth: 1,
  borderColor: colors.grey4,
  paddingVertical: 4,
};

export const BUTTON_TEXT: TextStyle = {
  color: colors.black,
};
export const LOADER: ViewStyle = {
  marginTop: '40%',
};
