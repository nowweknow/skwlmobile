import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import * as RNIap from 'react-native-iap';
import { MaterialIndicator } from 'react-native-indicators';

import { colors } from 'theme';
import { Button, Container, Input, MarginTopBlock, Screen, Text } from 'components';
import { Header } from 'app/screens/common/customComponents';

import * as S from './styles';
import { Product } from 'react-native-iap';
import { MARGIN_TOP_SP7 } from 'app/variables/common-styles';
import { api } from 'app/api';
import { useDispatch } from 'react-redux';
import { setProfile } from 'app/redux/reducers/profile/profileSlice';
import { IProfile } from 'types';
import { useSelector } from 'hooks';
import { profile as profileSelector } from 'app/redux/selectors';

const productIds: string[] = Platform.select({
  ios: [
    'basic_plan'
  ],
  android: [
    'basic_plan_android'
  ]
}) as string[];

export const SubscriptionScreen = () => {
  // in our case, product = plan
  const [products, setProducts] = useState<Product[]>([])
  const dispatch = useDispatch()
  const profile: IProfile | null = useSelector(profileSelector.my)

  useEffect(() => {
    if (!products.length) {
      RNIap.getProducts(productIds).then(
        (loadedProducts: Product[]) => {
          console.log(loadedProducts, 'loadedProducts')
          setProducts(loadedProducts)
        }
      ).catch(e => console.log(e.message, 'error'))
    }

    const purchaseUpdatedSubscription = RNIap.purchaseUpdatedListener(purchase => {
      const receipt: string = purchase.transactionReceipt
      if (receipt) {
        api.completePayment(receipt).then(res => {
          if (res.data.ok) {
            RNIap.finishTransaction(purchase)
            dispatch(setProfile({ ...profile as IProfile, plan: 'base' }))
          }
        })
      }
    })

    return () => purchaseUpdatedSubscription.remove()
  }, [])

  return (
    <Screen preset='scroll'>
      <Container>
        <Header title={'Add Product'} isBack={true} />
        {!products.length ? <View style={MARGIN_TOP_SP7}>
          <MaterialIndicator
            color={colors.accent}
            size={20}
            count={20}
          />
        </View> : <>
          <View style={S.TEXT_BLOCK}>
            <Text preset={'averageHigh'} style={S.TEXT}>
              You dont have any plan select yet. Please choose a plan to add a product
            </Text>
          </View>
          <MarginTopBlock marginTop={24}>
            <Text preset={'averageHigh'}>Select a Plan</Text>
          </MarginTopBlock>
          <MarginTopBlock marginTop={8}>
            <Shadow distance={15} startColor={colors.accentBg} offset={[0, 2]}>
              <View style={S.TARIFF}>
                <View>
                  <View style={S.TARIFF_LABEL}>
                    <Text style={S.TARIFF_TEXT}>basic</Text>
                  </View>
                  <View style={S.OPTIONS}>
                    <Text text={'•  Add Products'} />
                    <Text text={'•  Add Products on home'} />
                  </View>
                </View>
                <MarginTopBlock>
                  <View style={S.TEXT_TARIFF}>
                    <Text preset={'title'}>{products[0].price}</Text>
                    <Text preset={'title'} color={colors.grey}>
                      /month
                    </Text>
                  </View>
                </MarginTopBlock>
              </View>
            </Shadow>
          </MarginTopBlock>

          <MarginTopBlock marginTop={24}>
            <Text preset={'averageHigh'} color={colors.stone}>
              Choose your billing
            </Text>
          </MarginTopBlock>
          <Shadow distance={2} startColor={colors.accentBg} offset={[0, 2]}>
            <Button preset={'primaryLight'} style={S.BILLING}>
              <View style={S.TEXT_TARIFF}>
                <Text preset={'title'}>{products[0].price}</Text>
                <Text preset={'title'} color={colors.grey}>
                  /month
                </Text>
              </View>
            </Button>
          </Shadow>
          <MarginTopBlock marginTop={70}>
            <Button
              text={'Next'}
              iconRight={'arrowRight'}
              iconSize={12}
              style={S.NEXT}
              onPress={() => RNIap.requestSubscription(products[0].productId)}
            />
          </MarginTopBlock>
        </>}
      </Container>
    </Screen>
  );
};
