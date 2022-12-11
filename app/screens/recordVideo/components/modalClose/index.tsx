import React from 'react';
import Dialog from 'react-native-dialog';

interface IProps {
  isShow: boolean;
  setIsShowModal: (isShow: boolean) => void;
  closeHandler: () => void;
  resetHandler: () => void;
}
export const ModalClose = (props: IProps) => {
  const {isShow, setIsShowModal, closeHandler, resetHandler} = props;

  const reset = () => {
    resetHandler();
    setIsShowModal(false);
  };

  const close = () => {
    closeHandler();
    setIsShowModal(false);
  };

  return (
    <Dialog.Container visible={isShow}>
      <Dialog.Title>Do you want to reset the video?</Dialog.Title>
      <Dialog.Button label="Close" onPress={close} />
      <Dialog.Button label="Reset" onPress={reset} />
    </Dialog.Container>
  );
};
