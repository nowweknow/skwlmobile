import * as React from 'react';
import {ImageStyle} from 'react-native';

import {colors} from 'theme';
import {icons, IconTypes} from './icons';

export interface IconProps {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  name: IconTypes;
  style?: ImageStyle;
}

export function SVGIcon({name, size = 20, width, height, style, color = colors.white, ...props}: IconProps): JSX.Element {
  const Icon = icons[name] || icons.help;
  return <Icon style={style} width={width || size} height={height || size} color={color} {...props} />;
}
