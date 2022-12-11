import dynamicLinks from "@react-native-firebase/dynamic-links"
import { useNavigation } from "@react-navigation/native"
import queryString from "query-string"
import { useCallback, useEffect } from "react"

import {BottomTabStack, HomeStack} from 'app/navigation/constans';

export const useDynamicLink = () => {
  const { navigate } = useNavigation()

  const handleDynamicLink = useCallback(
    (link) => {
      const parsed = queryString.parseUrl(link?.url)
      if (parsed.query.screenName === HomeStack.trendingScreen) {
        navigate(BottomTabStack.homeTab, {
          screen: HomeStack.trendingScreen,
          params: { sharedVideoId: parsed.query.sharedVideoId },
        });
      }
    },
    [navigate],
  )
  useEffect(() => {
    dynamicLinks().getInitialLink().then(handleDynamicLink)
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink)
    return () => unsubscribe()
  }, [handleDynamicLink])
}