import dynamicLinks from "@react-native-firebase/dynamic-links";
import queryString from "query-string";

import {HomeStack} from 'app/navigation/constans';
import {
    IOS_BUNDLE_ID,
    ANDROID_PACKAGE_NAME,
    DYNAMIC_LINK,
} from '@env';

export const createVideoLink = async (id: number ): Promise<string> => {
  return await dynamicLinks().buildLink({
    link: queryString.stringifyUrl({ url: DYNAMIC_LINK, query: { screenName: HomeStack.trendingScreen, sharedVideoId: id } }),
    domainUriPrefix: DYNAMIC_LINK,
    android: {
      packageName: ANDROID_PACKAGE_NAME,
      // fallbackUrl: 'https://google.com'
    },
    ios: {
      bundleId: IOS_BUNDLE_ID,
      // appStoreId:''
    },
  })
}