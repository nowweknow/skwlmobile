import * as React from 'react';
import {StyleProp, Text as ReactNativeText, TextProps as TextProperties, TextStyle} from 'react-native';

import {presets, TextPresets} from './text.presets';

export interface TextProps extends TextProperties {
  children?: React.ReactNode;

  color?: string;

  text?: string;

  style?: TextStyle;

  preset?: TextPresets;
}

export function Text({preset = 'default', text, color, children, style: styleOverride, ...rest}: TextProps) {
  const content = text || children;

  const style = presets[preset] || presets.default;
  const styles = [style, color && {color: color}, styleOverride] as StyleProp<any>;

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  );
}
