import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators'

import { Image, SVGIcon, Text } from 'components';
import { colors } from 'theme';
import { openLink } from 'app/helpers';

import { IUser } from 'app/types';
import * as S from './styles';
import { FLEX, FLEX_1 } from '../../screens/home/styles';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';
import { updateSaveStatusProduct } from 'app/redux/reducers/marketplace';
import { useDispatch } from 'react-redux';

export interface MarketplaceSaved {
  id: number;
}

export interface ProductItemProps {
  id: number;
  image_link: string;
  title: string;
  link: string;
  price: number;
  status: string;
  created_at: Date;
  user: IUser;
  getData?: () => void;
  marketplace_saved?: MarketplaceSaved[];
  pressClose?: (id: number) => void;
  dontShowUser?: boolean
  showCross: boolean
}

export const ProductItem = ({
  id,
  image_link,
  title,
  user,
  price,
  getData,
  marketplace_saved = [],
  link,
  pressClose,
  dontShowUser,
  showCross = true
}: ProductItemProps) => {
  const onPress = () => openLink(link);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handlePressSave = useDebouncedCallback((productId: number) => {
    updateStatusProduct(productId);
  }, 500);

  const updateStatusProduct = async (productId: number) => {
    setIsSaveLoading(true)
    const result = await dispatch(updateSaveStatusProduct(productId));
    setTimeout(() => { setIsSaveLoading(false) }, 1000)
    if (result?.type === updateSaveStatusProduct.fulfilled.type) {
      if (getData) getData();
    }
  };

  return (
    <TouchableOpacity style={S.PRODUCT} activeOpacity={0.8} onPress={onPress}>
      <View style={S.PRODUCT_IMAGE}>
        <Image source={{ uri: image_link }} height={175} />
        {isSaveLoading ? (
          <View style={S.PRODUCT_ICON}>
            <MaterialIndicator
              color={colors.white}
              size={17}
              count={17}
            />
          </View>
        ) : (
          getData && (
            <TouchableOpacity style={S.PRODUCT_ICON} onPress={() => handlePressSave(id)}>
              <SVGIcon name={'bookmark'} color={marketplace_saved.length > 0 ? colors.accent : colors.white} />
            </TouchableOpacity>
          )
        )}
        {showCross &&  (
          <TouchableOpacity style={S.ICON_CLOSE} onPress={() => pressClose(id)}>
            <SVGIcon size={14} name={'close'} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
      {dontShowUser ?
        <View style={S.PRODUCT_INFO2}>
          <Text style={{ ...S.PRODUCT_TITLE }}>
            {title}
          </Text>
          <Text style={S.PRICE2} preset={'small'}>
            ${price}
          </Text>
        </View>
        : <>
          <Text style={S.PRODUCT_TITLE} numberOfLines={2}>
            {title}
          </Text>
          <View style={S.PRODUCT_INFO}>
            <View style={S.AUTHOR}>
              <Image shape={'circle'} size={24} style={S.AUTHOR_IMAGE} source={{ uri: user?.avatar }} />
              <Text preset={'smallest'} color={colors.grey1}>
                {user?.first_name} {user?.second_name}
              </Text>
            </View>
            <Text style={S.PRICE} preset={'small'}>
              ${price}
            </Text>
          </View>
        </>}
    </TouchableOpacity>
  );
};
