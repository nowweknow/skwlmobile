import { Platform } from 'react-native'
import PushNotification, {PushNotificationObject} from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'


export const openLocalNotification = (remoteMessage: any) => {
    if (Platform.OS === 'ios') {
        PushNotificationIOS.addNotificationRequest({
            id: 'ios-notification',
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            userInfo: remoteMessage.data,
        })
    } else {
        PushNotification.localNotification({
            channelId: 'skwl-id',
            message: remoteMessage.notification.body,
            title: remoteMessage.notification.title,
            data: remoteMessage.data,
        } as PushNotificationObject)
    }
}
