import React from 'react';
import {Input} from 'components';

import {colors} from 'theme';

import * as S from './styles';

interface IProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchInput = (props: IProps) => {
  return (
    <Input
      styleContainer={S.SEARCH}
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={'Search'}
      iconLeft={'search'}
      leftIconColor={colors.stone}
    />
  );
};
