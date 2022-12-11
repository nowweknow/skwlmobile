import React from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';

import { Button, Container, Screen, Field, Text } from 'components';
import { Header } from 'app/screens/common/customComponents';
import { IProfile, IUser } from 'app/types';
import { updateProfile, profileForAuth, profile as getProfile } from 'app/redux/reducers/profile';
import { colors } from 'theme';

import * as S from './styles';
import { api } from 'app/api';
import { setProfile } from 'app/redux/reducers/profile/profileSlice';
import { RootState, useAppSelector } from 'app/redux/store';
import { TouchableOpacity } from 'react-native-gesture-handler';

const formFieldsParams = [
  {
    name: 'first_name',
    legend: 'First Name'
  },
  {
    name: 'second_name',
    legend: 'Last Name'
  },
  {
    name: 'username',
    legend: 'Profile Name',
  },
  {
    name: 'header',
    legend: 'Profile Headings',
  },
  {
    name: 'description',
    legend: 'Description',
  },
  {
    name: 'website_link',
    legend: 'Website Link',
  },
];

export const EditProfileScreen = () => {
  const {
    profile,
    isLoading,
  } = useAppSelector(state => state.profile)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    mode: 'onSubmit',
    defaultValues: {
      id: profile?.id,
      first_name: profile?.first_name,
      second_name: profile?.second_name,
      username: profile?.username,
      header: profile?.header,
      description: profile?.description,
      website_link: profile?.website_link,
    },
  });

  const dispatch = useDispatch();

  const submitDebounced = useDebouncedCallback((data: IUser) => {
    console.log(data, "data")
    submit(data);
  }, 1000);

  const submit = async (data: IUser) => {
    console.log("eee", data)
    const res = await dispatch(updateProfile(data));
    console.log("asdasd")
    if (res.type === updateProfile.fulfilled.type) {
      console.log("sssss")
      await dispatch(getProfile());
      Snackbar.show({
        text: 'Profile updated successfully',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.success,
      });
    }
  };

  const renderField = ({ legend, name, pattern }: { legend: string; name: string, pattern?: RegExp }) => {
    return <Field key={name} legend={legend} name={name} control={control} errors={errors} pattern={pattern} />;
  };

  return (
    <Screen preset={'scroll'}>
      <Container style={S.CONTAINER}>
        <Header style={S.HEADER} title={'Edit Profile'} isBack={true} isLoading={isLoading} />
        {formFieldsParams.map(renderField)}
      </Container>
      <Button text={'Save'} style={S.SAVE_BTN} onPress={handleSubmit(submitDebounced)} />
      {/* <TouchableOpacity  style={S.SAVE_BTN}
      onPress={handleSubmit(submitDebounced)}
      >
        <Text>czc</Text>
        </TouchableOpacity> */}
    </Screen>
  );
};
