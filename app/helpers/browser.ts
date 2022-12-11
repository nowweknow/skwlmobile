import {Linking} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import Snackbar from 'react-native-snackbar';

import {colors} from 'theme';

const browserParams = {
  // iOS Properties
  dismissButtonStyle: 'cancel',
  preferredBarTintColor: colors.accent,
  preferredControlTintColor: colors.white,
  readerMode: false,
  animated: true,
  modalPresentationStyle: 'fullScreen',
  modalTransitionStyle: 'coverVertical',
  modalEnabled: true,
  enableBarCollapsing: false,
  // Android Properties
  showTitle: true,
  toolbarColor: colors.accent,
  secondaryToolbarColor: colors.black,
  navigationBarColor: colors.black,
  navigationBarDividerColor: colors.white,
  enableUrlBarHiding: true,
  enableDefaultShare: true,
  forceCloseOnRedirection: false,
  // Specify full animation resource identifier(package:anim/name)
  // or only resource name(in case of animation bundled with app).
  animations: {
    startEnter: 'slide_in_right',
    startExit: 'slide_out_left',
    endEnter: 'slide_in_left',
    endExit: 'slide_out_right',
  },
};

export const openLink = async (url: string) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, browserParams);
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    Snackbar.show({
      text: error.message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: colors.red,
    });
  }
};
