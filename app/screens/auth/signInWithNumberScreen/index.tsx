import React from 'react';
import { SafeAreaView, View, TextInputProps, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { REACT_APP_STAGING_URL, REACT_APP_TEST_URL } from '@env';

import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';

import { Button, Screen, Field } from 'components';
import { BottomTabsParam } from 'navigation';

import * as S from './styles';
import { SliderStack } from 'app/navigation/constans';
import { Header } from 'app/screens/common/customComponents';

import { Controller } from 'react-hook-form';

import { Input, MarginTopBlock, Text } from 'components';
import { TEXT_ERROR } from 'app/components/field/styles'
import PhoneInput from 'react-native-phone-number-input';
interface IProps {
  navigation: NativeStackNavigationProp<BottomTabsParam>;
}

type SignInForm = {
  phone: string;
};

export const SignInWithNumberScreen = ({ navigation }: IProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInForm>({
    mode: 'onChange',
    defaultValues: {
      phone: '',
      
    },
  });

  const onSubmit = async (data: SignInForm) => {
    const { phone } = data;
    try {
      const response = await axios.post(`${REACT_APP_TEST_URL}/user-phone/login`, {
        phone,
      });
      console.log(response.data, "response Login data")
      const id = response.data.id
      return navigation.navigate<any>(SliderStack.enterCodeScreen, { id });
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.code);
      console.log(error)
    }
  };

  return (
    <Screen preset={'fixed'} style={S.CONTAINER}>
      <SafeAreaView style={S.HEADERR}>
        <Header title={""} isBack={true} />
      </SafeAreaView>
      {/* <View style={S.INPUT_CTR}>
        <Field legend={'Username'} name={'username'} control={control} errors={errors} />
      </View> */}
      <View style={S.INPUT_CTR}>
        <FieldNumber legend={'Phone number'} name={'phone'} control={control} errors={errors} keyboardType="number-pad" />
      </View>
      <Button style={S.BTN} isCentered text={'Next'} disabled={!isValid} fullWith onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
};

interface IField extends TextInputProps {
  legend: string;
  control: any;
  errors: any;
  name: string;
  minLength?: number
  pattern?: RegExp
}

export const FieldNumber = ({ legend, control, errors, name, minLength, pattern, ...rest }: IField) => {
  return (
    <MarginTopBlock>
      <Text preset={'titleBold'}>{legend}</Text>
      <MarginTopBlock marginTop={8}>
        <Controller
          control={control}
          name={name}
          rules={{
            required: { value: true, message: `"${legend}" is required` },
            pattern: pattern,
            minLength: minLength && { value: minLength, message: `Code must be ${minLength} chars` }
          }}
          render={({ field: { onChange, value } }) => <PhoneInput defaultCode="UA"
            layout="first"
            autoFocus
            onChangeFormattedText={onChange}
            containerStyle={S.INPUT_CTR}
            textContainerStyle={S.NUMBER_INPUT}
            {...rest}
          />}
        />
      </MarginTopBlock>
      <MarginTopBlock marginTop={4}>
        {errors[name] && (
          <Text preset={'smallHigh'} style={TEXT_ERROR}>
            {errors[name].message}
          </Text>
        )}
      </MarginTopBlock>
    </MarginTopBlock>
  );
};
