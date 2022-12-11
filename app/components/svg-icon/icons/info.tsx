import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={24} height={24} fill={color} {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 .333A6.67 6.67 0 0 0 .333 7 6.67 6.67 0 0 0 7 13.667 6.67 6.67 0 0 0 13.667 7 6.67 6.67 0 0 0 7 .333Zm.667 10H6.333v-4h1.334v4Zm0-5.333H6.333V3.667h1.334V5Z"
        fill="#C2D1D9"
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
