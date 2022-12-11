import {TextStyle} from 'react-native';
import {colors} from 'theme';

const SMALL: TextStyle = {
  color: colors.black,
  fontSize: 12,
  letterSpacing: 0,
  lineHeight: 14,
};

const AVERAGE: TextStyle = {
  color: colors.black,
  fontSize: 14,
  letterSpacing: 0,
  lineHeight: 16,
};

const BIG: TextStyle = {
  color: colors.black,
  fontSize: 16,
  letterSpacing: 0,
  lineHeight: 22,
};

export const presets: {
  default: TextStyle;
  title: TextStyle;
  titleBold: TextStyle;
  titleBoldest: TextStyle;
  titleBoldSmall: TextStyle;
  titleBoldestSmall: TextStyle;
  titleBig: TextStyle;
  titleBiggest: TextStyle;
  averageHigh: TextStyle;
  averageHighest: TextStyle;
  averageBold: TextStyle;
  averageBoldest: TextStyle;
  small: TextStyle;
  smallHigh: TextStyle;
  smallBold: TextStyle;
  smallBoldest: TextStyle;
  smallest: TextStyle;
} = {
  default: {...AVERAGE},
  title: {...BIG},
  titleBold: {...BIG, fontWeight: '600'},
  titleBoldest: {...BIG, fontWeight: '700', lineHeight: 19},
  titleBoldSmall: {...BIG, fontWeight: '500', lineHeight: 18},
  titleBoldestSmall: {...BIG, fontWeight: '700', lineHeight: 18},
  titleBig: {...BIG, fontSize: 18, fontWeight: '600', lineHeight: 24},
  titleBiggest: {...BIG, fontSize: 24, fontWeight: '600', lineHeight: 28},
  averageHigh: {...AVERAGE, lineHeight: 20},
  averageHighest: {...AVERAGE, lineHeight: 20},
  averageBold: {...AVERAGE, fontWeight: '600'},
  averageBoldest: {...AVERAGE, fontWeight: '700', lineHeight: 20},
  small: {...SMALL},
  smallHigh: {...SMALL, lineHeight: 18},
  smallBold: {...SMALL, fontWeight: '600'},
  smallBoldest: {...SMALL, fontWeight: '700', lineHeight: 18},
  smallest: {...SMALL, fontSize: 10, lineHeight: 12},
};

export type TextPresets = keyof typeof presets;
