import {ViewStyle} from 'react-native';
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
