import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { useDebouncedCallback } from 'use-debounce';

import { Button, Input, MarginTopBlock, SVGIcon, Text } from 'components';
import { colors } from 'theme';
import { IProduct } from 'screens';
import { addProduct, getProducts } from 'app/redux/reducers/marketplace';

import * as S from './styles';
import Snackbar from 'react-native-snackbar';

interface IProps {
  isShow: boolean;
  setIsShowModal: (isShow: boolean) => void;
  setProductData: (productData: IProduct) => void;
  productData: IProduct;
  initialProductState: IProduct;
  dontCreateProduct?: boolean
}

export const AddProductModal = ({ isShow, dontCreateProduct, setIsShowModal, setProductData, productData, initialProductState }: IProps) => {
  const [imageButtonName, setImageButtonName] = useState('Upload your file');
  const isFilled = productData.title && productData.link && productData.price && productData.image_link?.uri.length;
  const {
    auth: { isLogged },
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const launchPicker = async () => {
    try {
      const res = await ImagePicker.openPicker({
        mediaType: 'photo',
        includeBase64: false,
      });
      if( productData.link.substring(0,4) != "http")
      {
        productData.link = "https://" + productData.link;
      }
      setProductData({ ...productData, image_link: { name: res.filename ?? String(Date.now()), type: res.mime, uri: res.path } });
      const path = res.path
      setImageButtonName(path.substring(path.lastIndexOf('/')+1));
    } catch (error) {
      if (__DEV__) {
        console.log('Image picker error: ', error);
      }
      await ImagePicker.clean();
    }
  };
  const addProductHandler = async () => {
    if (!isFilled) {
      return Snackbar.show({
        text: 'All fields are required!',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.red,
      });
    }

    setIsShowModal(false);
    if (!dontCreateProduct) {
      const result = await dispatch(addProduct(productData));
      if (result?.type === 'marketplace/create/fulfilled') {
        dispatch(getProducts(isLogged));
      }
    }
  };
  const closeProductModal = () => {
    setProductData(initialProductState);
    setIsShowModal(false);
  };

  const debouncedAddProductHandler = useDebouncedCallback(() => {
    addProductHandler();
  }, 1000);

  return (
    <View style={S.MODAL}>
      <Modal isVisible={isShow}>
        <View style={S.CONTAINER}>
          <View style={S.HEADER}>
            <Text preset={'title'} text={'Add your product'} />
            <TouchableOpacity onPress={closeProductModal}>
              <SVGIcon name={'close'} size={14} color={colors.black} />
            </TouchableOpacity>
          </View>
          <Input value={productData.title} onChangeText={text => setProductData({ ...productData, title: text })} placeholder={'Type your product name'} />
          <MarginTopBlock>
            <Input value={productData.link} onChangeText={text => setProductData({ ...productData, link: text })} placeholder={'Paste URL here'} />
          </MarginTopBlock>
          <MarginTopBlock>
            <Input value={productData.price} onChangeText={text => setProductData({ ...productData, price: text })} placeholder={'Enter price here'} keyboardType='numeric' />
          </MarginTopBlock>
          <MarginTopBlock>
            <Button
              style={S.UPLOAD_BLOCK}
              textStyle={S.UPLOAD}
              onPress={launchPicker}
              text={imageButtonName}
              preset={'primaryLight'}
              fullWith={true}
              iconRight={'upload'}
              iconColor={colors.darkGrey}
            />
          </MarginTopBlock>
          <MarginTopBlock>
            <Button
              // preset={!isDisabled ? 'primaryLight' : 'primary'}
              style={S.ADD_BUTTON}
              text={'Add'}
              onPress={debouncedAddProductHandler}
            />
          </MarginTopBlock>
        </View>
      </Modal>
    </View>
  );
};
