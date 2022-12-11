import {TextStyle, ViewStyle} from 'react-native';

import {colors} from 'theme';
import {TAB_ANDROID_HEIGHT, TAB_IOS_HEIGHT} from 'variables';
import {isIos} from 'app/helpers';

export const BOTTOM_TABS: ViewStyle = {
  backgroundColor: colors.bottomNavigation,
  height: isIos ? TAB_IOS_HEIGHT : TAB_ANDROID_HEIGHT,
};

export const ITEM_BOTTOM_TABS: TextStyle = {
  color: colors.grey1,
  padding: 0,
  margin: 0,
  alignItems: 'center',
  flexDirection: 'column',
};

export const ICONBOX_BASE: ViewStyle = {
  width: 48,
  height: 48,
};

export const ICONBOX_MARKETPLACE: ViewStyle = {
  width: 60,
  height: 48,
};

export const ICONBOX_CREATE_POST: ViewStyle = {
  width: 40,
  height: 40,
};
