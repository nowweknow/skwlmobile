import React from 'react';
import {View} from 'react-native';
import Dialog from 'react-native-dialog';

import * as S from './styles';

interface IProps {
  isShow: boolean;
  setIsShowModal: (isShow: boolean) => void;
}
export const ModalDelete = ({isShow, setIsShowModal}: IProps) => {
  return (
    <View style={S.MODAL}>
      <Dialog.Container visible={isShow}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>Are you sure you want to delete the product?</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setIsShowModal(false)} />
        <Dialog.Button label="Delete" onPress={() => setIsShowModal(false)} />
      </Dialog.Container>
    </View>
  );
};
