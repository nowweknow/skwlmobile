import {ImageStyle, ViewStyle, TextStyle} from 'react-native';

export const PRODUCT: ViewStyle = {
  width: '49%',
};

export const PRODUCT_CONTENT: ViewStyle = {
  justifyContent: 'space-between',
};

export const PRODUCT_TITLE: ViewStyle = {
  marginTop: 10,
};

export const PRODUCT_INFO: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: 14,
  marginTop: 12,
  marginBottom: 16,
  alignItems: 'center',
};

export const PRODUCT_INFO2: ViewStyle = {
  flexDirection: 'row',
  marginBottom: 16,
};

export const PRODUCT_IMAGE: ViewStyle = {
  position: 'relative',
};

export const PRODUCT_ICON: ImageStyle = {
  position: 'absolute',
  bottom: 12,
  right: 12,
};

export const ICON_CLOSE: ImageStyle = {
  position: 'absolute',
  top: 12,
  right: 12,
  backgroundColor:'black',
  borderWidth:5,
  borderColor:'black',
  borderRadius:20
};

export const AUTHOR: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 2,
};

export const AUTHOR_IMAGE: ImageStyle = {
  marginRight: 5,
};

export const PRICE: TextStyle = {
  flex: 1.5,
  textAlign: 'right',
};

export const PRICE2: TextStyle = {
  flex: 1,
  paddingTop: 25,
  textAlign: 'right',
};
