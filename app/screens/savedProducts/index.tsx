import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {Container, Screen} from 'components';
import {Header, ProductItem} from 'app/screens/common/customComponents';
import {getSavedProducts, clearSavedProducts} from 'app/redux/reducers/marketplace';

import * as S from './styles';

export const SavedProductsScreen = () => {
  const {savedProducts} = useSelector(state => state.marketplace);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      getData();
      return () => {
        dispatch(clearSavedProducts());
      };
    }, []),
  );

  const getData = () => {
    dispatch(getSavedProducts());
  };

  const productItem = useCallback(({item}) => {
    return <ProductItem {...item?.marketplace} marketplace_saved={[1]} getData={getData} />;
  }, []);

  return (
    <Screen>
      <Container>
        <FlatList
          ListHeaderComponent={<Header style={S.HEADER} title={'My Saved Products'} isBack={true} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.price + index.toString()}
          columnWrapperStyle={S.CONTAINER}
          numColumns={2}
          data={savedProducts}
          renderItem={productItem}
        />
      </Container>
    </Screen>
  );
};
