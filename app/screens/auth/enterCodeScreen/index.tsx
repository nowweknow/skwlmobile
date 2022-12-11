import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { Button, Screen, Field } from 'components';
import { BottomTabsParam } from 'navigation';
import * as S from './styles';
import { useDispatch } from 'react-redux';
import { Header } from 'app/screens/common/customComponents';
import { RouteProp } from '@react-navigation/native';
import { signUpWithPhoneNumber } from 'app/redux/reducers/auth/actionCreators';
interface IProps {
  navigation: NativeStackNavigationProp<BottomTabsParam>;
  route: RouteProp<{ params: { id: number } }, 'params'>
}
type CodeForm = {
  code: string
}
export const EnterCodeScreen = ({ route }: IProps) => {
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CodeForm>({
    mode: "onChange",
    defaultValues: {
      code: '',
    },
  });
  const onSubmit = async (data: CodeForm) => {
    const id = route.params.id;
    const code = parseInt(data.code)
    dispatch(signUpWithPhoneNumber({
      id,
      code
    }))
  }
  return (
    <Screen style={S.CONTAINER}>
      <SafeAreaView style={S.HEADERR}>
        <Header title={""} isBack={true} />
      </SafeAreaView>
      <View style={S.INPUT_CTR}>
        <Field legend={'Code:'} name={'code'} minLength={4} control={control} errors={errors} keyboardType="number-pad" />
      </View>
      <Button style={S.BTN} isCentered text={'Confirm'} disabled={!isValid} fullWith onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
};