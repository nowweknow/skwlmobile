import React, { useEffect, useRef } from 'react';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import io, { Socket } from 'socket.io-client'
import moment from 'moment'

import { Header } from 'app/screens/common/customComponents';
import { Container, Image, SVGIcon } from 'components';
import { colors } from 'theme';

import * as S from './styles';
import { Bubble, Day, GiftedChat, InputToolbar, InputToolbarProps, Message, Send } from 'react-native-gifted-chat';
import { useState } from 'react';
import { profile as profileSelector } from 'app/redux/selectors';
import { useSelector } from 'hooks';
import { IMessage, IProfile, IChatListItem } from 'types';
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context';
import { api, getToken } from 'app/api';
import { REACT_APP_STAGING_URL, REACT_APP_TEST_URL } from '@env';
import { AxiosResponse } from 'axios';
import { Screen } from 'react-native-screens';
import { KeyboardAvoidingView } from 'react-native';
import { isIos } from 'app/helpers';
interface IMessage4GiftedChat {
  _id: number,
  createdAt: number,
  text: string,
  user: {
    avatar: string
    _id: number
  }
}

export const InboxDialogScreen = () => {
  const route = useRoute<RouteProp<{ params: { id: number; val: number; name: string } }>>();
  const [messages, setMessages] = useState<IMessage4GiftedChat[]>([])
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false)
  const [isConnected2ChatRoom, setIsConnected2ChatRoom] = useState<boolean>(false)
  const [chats, setChats] = useState<IChatListItem[]>()
  const profile: IProfile | null = useSelector(profileSelector.my)
  const [chatId, setChatId] = useState(route.params.val)
  const socketRef = useRef<any>()
  const isScreenFocused: boolean = useIsFocused()
  const [keyboardStatus, setKeyboardStatus] = useState('');
  const companionId = route.params.id
  if (socketRef.current?.connected)console.log('socket connected')
  const getAllMessages = () => {
    api.getAllMessagesOfChat(chatId).then((response: AxiosResponse<IMessage[]>) => {
      console.log(response)
      setMessages(response.data.map(message => ({
        _id: message.id,
        createdAt: moment(new Date(message.created_at)).valueOf(),
        text: message.message,
        user: {
          avatar: message.author.avatar as string,
          _id: message.author.id as number,
        }
      })
      ))
    }).catch(err => console.log(err, "GetAllMessages Error"))
  }
  useEffect(() => {

    if (isConnected2ChatRoom) {
      console.log("isConnected2ChatRoom")
      socketRef.current.on('sendMessage', (data: any) => {
        console.log(data, '>sendMessage')
        const ss = data.message;
        setMessages([
          ...messages,
          {
            _id: Math.random(),
            createdAt: moment(new Date()).valueOf(),
            text: ss,
            user: {
              avatar: '',
              _id: Math.random(),
            }
          }
        ])
      })
    }
    return () => {
    };
    // return() => {Keyboard.removeAllListeners('keyboardWillShow')};
  }, [isConnected2ChatRoom])

  const creatChatRoom = async () => {
    await api.getChatsPost(companionId).then(res => {
      console.log(res, "Create Chat Id response")
      setChatId(res.data.id)

      api.getAllMessagesOfChat(res.data.id).then((response: AxiosResponse<IMessage[]>) => {
        setMessages(response.data.map(message => ({
          _id: message.id,
          createdAt: moment(new Date(message.created_at)).valueOf(),
          text: message.message,
          user: {
            avatar: message.author.avatar as string,
            _id: message.author.id as number,
          }
        })
        ))
      }).catch(err => console.log(err, "GetAllMessages Error"))

    }).catch(error => console.log(error.message, chatId, "Create chatId Error"))
  }

  useEffect(() => {
   
    setChatId(route.params.val)
    if (isScreenFocused) {  
      if (chatId == undefined) {
        creatChatRoom()
        console.log("chatId undifined")
      }
      getAllMessages()
      socketRef.current = io(
        REACT_APP_TEST_URL,
        {
          extraHeaders: {
            authorization: getToken() as string
          }
        }
      )
      console.log("chatId asasas")
      socketRef.current.emit('createChatroom', { chatId })
      socketRef.current.on('createChatroom', (data: string) => {
        console.log(data, '>>>>>>createChatroom')
        
        if (data.includes('added to chatroom'))
          setIsConnected2ChatRoom(true)
      })
    } else {
      socketRef.current.emit('leaveChatroom', { chatId })
      setIsConnected2ChatRoom(false)
      setMessages([])
      socketRef.current = null
    }
    // return() => {Keyboard.removeAllListeners('keyboardWillShow')};
    return () => {
      socketRef.current.close();
    };
  }, [isScreenFocused])

  const onSend = async (messages = []) => {
    setIsSendingMessage(true)
    
    socketRef.current.emit('sendMessage', { chatId, message: messages[0].text })
    
    api.getAllMessagesOfChat(chatId).then((response: AxiosResponse<IMessage[]>) => {
      console.log(response)
      setMessages(response.data.map(message => ({
        _id: message.id,
        createdAt: moment(new Date(message.created_at)).valueOf(),
        text: message.message,
        user: {
          avatar: message.author.avatar as string,
          _id: message.author.id as number,
        }
      })
      ))
    }).catch(err => console.log(err, "GetAllMessages Error"))
    console.log(messages,"message")
    setIsSendingMessage(false)
   

  }
  const renderSendBtn = (props: InputToolbarProps): JSX.Element => {
    return (
      <Send disabled={isSendingMessage} {...props} alwaysShowSend>
        <View style={S.BTN}>
          <SVGIcon name={'send'} color={isSendingMessage ? colors.darkGrey : colors.accent} size={30} />
        </View>
      </Send>
    )
  }

  const renderAvatar = (props): JSX.Element => {
    return (
      <TouchableOpacity>
        <Image source={{ uri: props.currentMessage.user.avatar }} style={S.AVATAR} />
      </TouchableOpacity>
    )
  }

  const renderBubble = (props): JSX.Element => {
    return (
      <Bubble
        {...props}
        textStyle={S.BUBBLE_TEXT}
      />
    )
  }
  const renderMessage = (props): JSX.Element => {
    return(<Message {...props} containerStyle={S.MESSAGEE} />
    )
  }
  const renderInputToolbar = (props): JSX.Element => {
    return <InputToolbar {...props} />
  }
  const renderDay = (props): JSX.Element => (
    <Day {...props} containerStyle={S.DAY_CONTAINER} />
  )
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  
  return (
    <SafeAreaView style={S.CONTAINER}>
      <Container>
        <Header title={route?.params?.name} isBack={true}  />
      </Container>
 
      <View style={S.CHAT_BOX}>
        <GiftedChat
          messages={messages}
          placeholder='Type a message...'
          onSend={(messages) => onSend(messages)}
          user={{ _id: profile?.id ?? 1 }}
          renderSend={renderSendBtn}
          renderBubble={renderBubble}
          textInputProps={{ style: S.INPUT_CONT }}
          // renderAvatar={renderAvatar}
          // renderInputToolbar={renderInputToolbar}
          renderMessage={renderMessage}
          timeTextStyle={S.TIME_TEXT}
          renderDay={renderDay}
        />
      </View>
    </SafeAreaView>
  );
};