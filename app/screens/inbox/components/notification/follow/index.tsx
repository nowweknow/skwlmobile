import React from 'react';
import { View } from 'react-native';

import { Avatar, Button, Text } from 'components';

import * as S from './styles';
import { INotification } from 'types';

export const Follow = (props: { notification: INotification; onFollow: (notification: INotification) => void }) => {
  const { user } = props.notification;
  const { first_name, second_name, email, followers, } = user;
  const name: string = (first_name || second_name || email) as string
  const isFollowed: boolean = !!followers?.length

  return (
    <View style={S.FOLLOW}>
      <View style={S.FOLLOW_WRAPPER}>
        <Avatar uri={user.avatar as string} />
        <View style={S.FOLLOW_INFO}>
          <Text preset={'averageBoldest'} text={`${name}`} />
          <Text preset={'averageHigh'} text={' followed you'} />
        </View>
      </View>

      <View>
        <Button
          preset={isFollowed ? 'disabled' : 'follow'}
          disabled={isFollowed}
          style={S.FOLLOW_BUTTON}
          text={`follow${isFollowed ? 'ed' : ''}`}
          onPress={() => props.onFollow(props.notification)}
        />
      </View>
    </View>
  );
};
