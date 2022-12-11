import React, { useCallback, useState } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

import { colors } from 'theme';
import { Screen } from 'components';
import {
  Header,
  ProductItem,
  SearchInput
} from 'app/screens/common/customComponents';
import {
  AddProductModal
} from 'app/screens/common/customComponents/addProductModal';
import { IProduct } from 'app/screens/publishPost';
import {
  getProducts,
  searchProduct,
  searchProductForAuth,
  clearProducts,
} from 'app/redux/reducers/marketplace';
import { initialProductState } from 'app/variables';

import * as S from './styles';

export const MarketPlaceScreen = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [isProductModal, setIsProductModal] = useState<boolean>(false);

  const [productData, setProductData] = useState<IProduct>(initialProductState);
  const {
    marketplace: { products, isLoading },
    auth: { isLogged },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const productItem = useCallback(({ item }) => {
    return <ProductItem getData={getData} {...item} showCross={false} />;
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
      return () => {
        dispatch(clearProducts());
      };
    }, []),
  );

  const getData = () => {
    dispatch(getProducts(isLogged));

  };

  const search = (key: string) => {
    setKeyword(key);
    debounced(key);
  };

  const debounced = useDebouncedCallback((key: string) => {
    if (key.length === 0) {
      return getData();
    }

    if (isLogged) {
      return dispatch(searchProductForAuth(key));
    }

    return dispatch(searchProduct(key));
  }, 500);

  const onPlusPress = useCallback(() => {
    setIsProductModal(true)
  }, [])

  const flatListHeader = (
    console.log(),
    <>
      <Header title={'Market Place'} rightIcon={'plus'} rightIconHandler={() => onPlusPress()} rightIconColor={colors.grey} isBack={false} />
      <View style={S.SEARCH_BLOCK}>
        <SearchInput value={keyword} onChangeText={(txt: string) => search(txt)} />
        {isLoading && (
          <View style={S.SPINNER_BLOCK}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    </>
  );

  return (
    <Screen safePaddingBottom={false}>
      <View style={S.CONTAINER}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={flatListHeader}
          keyExtractor={(item, index) => item.price + index.toString()}
          columnWrapperStyle={S.PRODUCT_CONTENT}
          numColumns={2}
          data={products}
          renderItem={productItem}
        />
        {isProductModal && (
          <AddProductModal
            isShow={isProductModal}
            setIsShowModal={setIsProductModal}
            setProductData={setProductData}
            productData={productData}
            initialProductState={initialProductState}
          />
        )}
      </View>
    </Screen>
  );
};
