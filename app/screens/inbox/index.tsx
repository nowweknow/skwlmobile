import React, { useCallback, useState } from 'react';
import { Button, Container, Image, Screen, Text } from 'components';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Message, Follow, Like } from 'app/screens/inbox/components/notification';
import { SearchInput } from 'app/screens/common/customComponents';
import { InboxNavigatorParams } from 'navigation';
import { InboxStack } from 'app/navigation/constans';
import { IChatListItem, INotification, IProfile, IUser, NotificationTypeEnum } from 'types';

import * as S from './styles';
import { useEffect } from 'react';
import { api } from 'app/api';
import { useSelector, } from 'hooks';
import { profile as profileSelector } from 'app/redux/selectors';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { Value } from 'react-native-reanimated';

import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

enum InboxEnum {
  Messages = 'messages',
  Notifications = 'notifications',
}

type NavigationTypes = {
  navigation: NativeStackNavigationProp<InboxNavigatorParams>
}

export const InboxScreen = ({ navigation }: NavigationTypes) => {
  const [tab, setTab] = useState<InboxEnum>(InboxEnum.Messages);
  const [chats, setChats] = useState<IChatListItem[]>()
  const profile: IProfile | null = useSelector(profileSelector.my)

  // notifications 
  const [page, setPage] = useState<number>(1)
  const [isAllNotificationsGot, setIsAllNotificationsGot] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [keyword, setKeyword] = useState<string>('');


  const dispatch = useDispatch();

  const handleGetNotifications = () => {
    if (!isAllNotificationsGot) {
      api.getNotifications(page)
        .then(res => {
          if (res.data.length) {
            setNotifications(prev => ([...prev, ...res.data]))
            setPage(page + 1)
          } else
            setIsAllNotificationsGot(true)
        })
    }
  }

  const navigateDialogScreen = (companionId: number, chatId: number, userName: string) => {
     navigation.navigate(InboxStack.inboxDialogScreen, { id: companionId, val:chatId, name: userName });
  };

  useEffect(() => {
    api.getChats().then(res => {setChats(res.data)
    })
    if (tab === InboxEnum.Notifications) {
      handleGetNotifications()
    } else {
      setNotifications([])
      setPage(1)
      setIsAllNotificationsGot(false)
    }
  }, [tab])

  const renderChatItem = useCallback(({ item }) => {
    console.log("RenderChat",item)
    const chat: IChatListItem = item
    const user: IUser = chat.creator.id === profile?.id ? chat.companion : chat.creator
    const displayName: string = (
      `${user.first_name || user.second_name ?
        `${user.first_name} ${user.second_name}`
        : user.email}`
    )
    return (
      <TouchableOpacity onPress={() => navigateDialogScreen(item.companion.id, item.id, displayName)}>
        <View style={S.MESSAGE}>
          <View>
            <Image size={48} shape={'circle'} source={{ uri: user.avatar as string }} />
          </View>
          <View style={S.MESSAGE_INFO}>
            <Text
              preset={'averageBoldest'}
              text={displayName}
            />
            <Text
              preset={'averageHigh'}
              style={S.MESSAGE_TEXT}
              //text={chat.last_message} // backend not added yet
              //text='Some text'
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [chats]);

  const notificationItem = ({ item }: { item: INotification }): any => {
    const onFollowPress = (notification: INotification) => {
      setNotifications(notifications.map(item => {
        if (item.id === notification.id) {
          return ({ ...item, user: { ...item.user, followers: [{ id: 1 }] } })
        } else return item
      }))
    }

    if (item.type === NotificationTypeEnum.messageType) {
      return <Message user={item.user} />;
    }
    if (item.type === NotificationTypeEnum.LikeType) {
      return <Like notification={item} />;
    }
    if (item.type === NotificationTypeEnum.FollowType) {
      return <Follow notification={item} onFollow={onFollowPress} />;
    }
  };

// const searchResult = (key: string) => {
//   setKeyword(key);
//   console.log(key)
// };


  const flatListHeader = (
    <Container marginTop={18}>
      <View style={S.TOGGLE_BLOCK}>
        <Button
          text={'Messages'}
          preset={'text'}
          isCentered={true}
          style={S.TOGGLE_BUTTON}
          textStyle={[S.TAB_TEXT, tab === InboxEnum.Messages && S.TAB_ACTIVE]}
          onPress={() => setTab(InboxEnum.Messages)}
        />
        <Button
          text={'Notifications'}
          preset={'text'}
          isCentered={true}
          style={S.TOGGLE_BUTTON}
          textStyle={[S.TAB_TEXT, tab === InboxEnum.Notifications && S.TAB_ACTIVE]}
          onPress={() => setTab(InboxEnum.Notifications)}
        />
      </View>
      {/* <SearchInput value={keyword} onChangeText={(txt: string) => searchResult(txt)} /> */}
    </Container>
  );

  return (
    <Screen safePaddingBottom={false}>
      {tab === InboxEnum.Messages ? (
        <FlatList
          key='messages'
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={flatListHeader}
          style={S.CONTAINER}
          keyExtractor={(item) => item.id.toString()}
          data={chats}
          renderItem={renderChatItem}
        />
      ) : (
        <FlatList
          key='notifications'
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={flatListHeader}
          style={S.CONTAINER}
          keyExtractor={item => item.id.toString()}
          data={notifications}
          renderItem={notificationItem}
          onEndReached={handleGetNotifications}
          onEndReachedThreshold={0.1}
        />
      )}
    </Screen>
  );
};
