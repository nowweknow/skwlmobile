import React, { useState } from 'react';
import { Switch } from 'react-native-switch';

import { Container, Screen, Text } from 'components';
import { Header } from '../common/customComponents';
import * as S from './styles';
import { View } from 'react-native';
import { colors } from 'theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'hooks';
import { profile } from 'app/redux/selectors/profile';
import { INotificationsSettings } from 'types';
import { useEffect } from 'react';
import { api } from 'app/api';
import { setNotificationsSettings } from 'app/redux/reducers/profile/profileSlice';
import { useIsFocused } from '@react-navigation/native';
import { getNotificationsSettings } from 'app/redux/reducers/profile/actionCreators';

export const NotificationsScreen = () => {
  const dispatch = useDispatch()
  const isScreenFocused: boolean = useIsFocused()
  const notificationsSettings: INotificationsSettings | null = useSelector(profile.notificationsSettings)

  useEffect(() => {
    if (notificationsSettings) {
      api.updateNotificationsSettings(notificationsSettings)
    }
  }, [notificationsSettings])

  useEffect(() => {
    if (!notificationsSettings && isScreenFocused) {
      dispatch(getNotificationsSettings())
    }
  }, [isScreenFocused])

  return (
    <Screen>
      <Container>
        <Header style={S.HEADER} title={'Notifications'} isBack={true} />
        {!!notificationsSettings && (<>
          <View style={S.ROW}>
            <Text preset={'title'} text={'New follower'} />
            <Switch
              value={notificationsSettings.newFollower}
              onValueChange={bool => {
                dispatch(setNotificationsSettings({
                  ...notificationsSettings,
                  newFollower: bool,
                }))
              }}
              renderActiveText={false}
              renderInActiveText={false}
              backgroundActive={colors.accent}
              backgroundInactive={colors.grey4}
              circleBorderWidth={0}
              switchWidthMultiplier={2.2}
              barHeight={33}
              circleSize={28}
            />
          </View>
          <View style={S.ROW}>
            <Text preset={'title'} text={'New message'} />
            <Switch
              value={notificationsSettings.newMessage}
              onValueChange={bool => {
                dispatch(setNotificationsSettings({
                  ...notificationsSettings,
                  newMessage: bool,
                }))
              }}
              renderActiveText={false}
              renderInActiveText={false}
              backgroundActive={colors.accent}
              backgroundInactive={colors.grey4}
              circleBorderWidth={0}
              switchWidthMultiplier={2.2}
              barHeight={33}
              circleSize={28}
            />
          </View>
          <View style={S.ROW}>
            <Text preset={'title'} text={'New like'} />
            <Switch
              value={notificationsSettings.newLike}
              onValueChange={bool => {
                dispatch(setNotificationsSettings({
                  ...notificationsSettings,
                  newLike: bool,
                }))
              }}
              renderActiveText={false}
              renderInActiveText={false}
              backgroundActive={colors.accent}
              backgroundInactive={colors.grey4}
              circleBorderWidth={0}
              switchWidthMultiplier={2.2}
              barHeight={33}
              circleSize={28}
            />
          </View>
        </>)}
      </Container>
    </Screen>
  );
};
