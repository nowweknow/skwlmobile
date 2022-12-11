import { ReceivedNotification } from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

export const onPressPush = (
    message: Omit<ReceivedNotification, 'userInfo'>,
) => {
    console.log('PRESS message', message)
    console.log('message.foreground', message.foreground);
    if (message.foreground && message.userInteraction) {
        console.log('message DATA', message.data);
    }
    message.finish(PushNotificationIOS.FetchResult.NoData)
}
