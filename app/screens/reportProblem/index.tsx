import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import Snackbar from 'react-native-snackbar';

import { Button, Container, Input, Screen } from 'components';

import * as S from './styles';
import { Header } from '../common/customComponents';
import { api } from 'app/api';
import { colors } from 'theme';
import { useNavigation } from '@react-navigation/native';
import { ProfileStack } from 'app/navigation/constans';
import { ButtonPresetNames } from 'app/components/button/button.presets';

export const ReportProblemScreen = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const onSend = () => {
    setLoading(true)
    Keyboard.dismiss
    api.report(message).then(res => {
      if (res.status === 201) {
        setMessage('')
        setLoading(false)
        Snackbar.show({
          text: 'The message was sent successfully',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.success,
        });
        navigation.navigate(ProfileStack.profileScreen)
      }
    }).catch(() => {
      setLoading(false)
    })
  }

  let btnPreset: ButtonPresetNames = 'primary'
  if (loading) btnPreset = 'primaryLoading'
  else if (!message.length) btnPreset = 'primaryDisabled'

  return (
    <Screen>
      <Container>
        <Header style={S.HEADER} title={'Report a problem'} isBack={true} />
        <Input
          value={message}
          onChangeText={setMessage}
          placeholder={'Enter a message'}
          textStyle={S.INPUT}
          multiline
          styleContainer={S.INPUT_WRAPPER}
        />
        <View style={S.BTN_WRAPPER}>
          <Button
            disabled={loading || !message.length}
            text={'Send'}
            style={S.SEND_BTN}
            onPress={onSend}
            preset={btnPreset}
          />
        </View>
      </Container>
    </Screen>
  );
};
