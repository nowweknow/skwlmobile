import PushNotification from 'react-native-push-notification'

export const createAndroidChannel = () => {
    PushNotification.createChannel(
        {
            channelId: 'skwl-id',
            channelName: 'skwl-channel',
        },
        () => null,
    )
}
