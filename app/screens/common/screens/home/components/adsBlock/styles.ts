import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {colors} from 'theme';

export const ADS: ViewStyle = {
  backgroundColor: colors.whiteOpacity,
  width: 206,
  height: 106,
  borderRadius: 13,
  paddingLeft: 10,
  paddingRight: 5,
  flexDirection: 'column',
  marginRight: 12,
  paddingBottom:20
};

export const ADS_INFO: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex:1
};

export const ADS_PRODUCT_TEXT: TextStyle = {
  maxWidth: 137,
  color: colors.white,
  fontWeight: '500',
  lineHeight: 18,
  fontSize: 15,
  marginTop: 10,
};

export const ADS_INFO_BOOKMARK: ImageStyle = {
  marginTop: 16,
  marginRight: 6,
  justifyContent: 'center',
};
export const ADS_PRICE: TextStyle = {
  color: colors.white,
  fontWeight: '700',
  marginTop: 5,
};
