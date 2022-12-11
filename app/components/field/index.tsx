import React from 'react';
import { TextInputProps } from 'react-native';
import { Controller } from 'react-hook-form';

import { Input, MarginTopBlock, Text } from 'components';
import { TEXT_ERROR } from './styles';

interface IField extends TextInputProps {
  legend: string;
  control: any;
  errors: any;
  name: string;
  minLength?: number
  pattern?: RegExp
}

export const Field = ({ legend, control, errors, name, minLength, pattern, ...rest }: IField) => {
  return (
    <MarginTopBlock>
      <Text preset={'titleBold'}>{legend}</Text>
      <MarginTopBlock marginTop={8}>
        <Controller
          control={control}
          name={name}
          rules={{
            required: { value: true, message: `"${legend}" is required` },
            pattern: pattern,
            minLength: minLength && { value: minLength, message: `Code must be ${minLength} chars` }
          }}
          render={({ field: { onChange, value } }) => <Input value={value} onChangeText={onChange}  {...rest} />}
        />
      </MarginTopBlock>
      <MarginTopBlock marginTop={4}>
        {errors[name] && (
          <Text preset={'smallHigh'} style={TEXT_ERROR}>
            {errors[name].message}
          </Text>
        )}
      </MarginTopBlock>
    </MarginTopBlock>
  );
};
