import React from 'react';
import { View } from 'react-native';

import { Avatar, Image, Text } from 'components';

import * as S from './styles';
import { INotification } from 'types';

export const Like = (props: { notification: INotification }) => {
  let boldTitle: string = ''
  let title: string = ''
  let name2: string = ''
  const { notification } = props;
  const { first_name, second_name, email } = notification.user;
  const name1: string = (first_name || second_name || email) as string
  if (notification.parent) {
    const user2 = notification.parent.user;
    name2 = (user2.first_name || user2.second_name || user2.email) as string
  }

  boldTitle = name1 + ' '
  if (name2) {
    boldTitle += ( notification.likeCount === 2 ? ' and ' : ', ' ) + name2 + ' '
  }
  if (notification.likeCount && notification.likeCount > 2) {
    boldTitle += 'and '
    title = (notification.likeCount - 2) + ' other'
  }

  return (
    <View style={S.LIKE}>
      <View>
        <Avatar uri={notification.user.avatar as string} />
      </View>
      <View style={S.LIKE_INFO}>
        <View style={S.LIKED_TEXT}>
          <Text preset={'averageBoldest'} text={boldTitle} />
          <Text preset={'averageHighest'} text={title} />
          <Text preset={'averageHighest'} text={'Liked your video'} />
        </View>
      </View>
    </View>
  );
};
