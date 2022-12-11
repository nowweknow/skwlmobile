import * as React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle, View } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators'

import { viewPresets, textPresets } from './button.presets';
import { SVGIcon, Text } from 'components';
import { IconTypes } from 'app/components/svg-icon/icons';

import { ButtonPresetNames } from './button.presets';
import * as S from './styles';
import { colors } from 'theme';

export interface ButtonProps extends TouchableOpacityProps {
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  preset?: ButtonPresetNames;
  children?: React.ReactNode;
  iconLeft?: IconTypes;
  iconRight?: IconTypes;
  iconSize?: number;
  iconColor?: string;
  activeOpacity?: number;
  fullWith?: boolean;
  isCentered?: boolean;
  loadingIndicatorColor?: string;
}

export function Button({
  preset = 'primary',
  text,
  style: styleOverride,
  textStyle: textStyleOverride,
  children,
  iconLeft,
  iconSize,
  iconRight,
  iconColor,
  activeOpacity,
  fullWith = false,
  isCentered = false,
  loadingIndicatorColor = colors.accent,
  ...rest
}: ButtonProps) {
  const viewStyle = viewPresets[preset] || viewPresets.primary;
  const viewStyles = [viewStyle, styleOverride];
  const textStyle = textPresets[preset] || textPresets.primary;
  const textStyles = [textStyle, textStyleOverride] as TextStyle;

  const content = children || <Text text={text} style={textStyles} />;

  const Content = () => (
    <>
      {preset.includes('Loading') ? (
        <Text>
          <MaterialIndicator
            color={loadingIndicatorColor}
            size={20}
            count={20}
          />
        </Text>
      ) : (
        content
      )}
    </>
  )

  return (
    <>
      <TouchableOpacity style={viewStyles} {...rest} activeOpacity={activeOpacity}>
        {iconLeft && (
          <View style={S.ICON_LEFT}>
            <SVGIcon name={iconLeft} color={iconColor} size={iconSize} />
          </View>
        )}
        <View
          style={[S.BUTTON, isCentered && S.BUTTON_CENTER, fullWith && S.BUTTON_FULLWIDTH]}
        >
          <Content />
        </View>
        {iconRight && (
          <View style={S.ICON_RIGHT}>
            <SVGIcon name={iconRight} color={iconColor} size={iconSize} />
          </View>
        )}
      </TouchableOpacity>
    </>
  );
}
