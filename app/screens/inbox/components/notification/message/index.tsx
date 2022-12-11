import React from 'react';
import { View } from 'react-native';

import { Avatar, Text } from 'components';

import * as S from './styles';
import { IUser } from 'types';

export const Message = (props: { user: IUser }) => {
  const { avatar, first_name, second_name, email } = props.user;
  return (
    <View style={S.COMMENT}>
      <View>
        <Avatar uri={avatar as string} />
      </View>
      <View style={S.COMMENT_INFO}>
        <Text
          preset={'averageBoldest'}
          text={`You have a new message from ${first_name || second_name || email}`}
        />
        {/*<Text preset={'averageHigh'} style={S.COMMENT_TEXT} text={message} />*/}
      </View>
    </View>
  );
};
