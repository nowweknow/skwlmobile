import {TextStyle, ViewStyle} from 'react-native';
import {colors} from 'theme';

export const MODAL: ViewStyle = {
  flex: 1,
  position: 'absolute',
};

export const CONTAINER: ViewStyle = {
  backgroundColor: colors.white,
  padding: 16,
  borderRadius: 5,
};

export const HEADER: ViewStyle = {
  paddingBottom: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const UPLOAD_BLOCK: ViewStyle = {
  height: 54,
};

export const UPLOAD: TextStyle = {
  color: colors.darkGrey,
};

export const ADD_BUTTON: ViewStyle = {
  alignSelf: 'flex-end',
};
