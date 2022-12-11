import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={22} height={6} fill="none" {...props}>
      <Path
        d="M5.023 3.008A2.26 2.26 0 0 0 2.738.746 2.263 2.263 0 0 0 .477 3.008c0 1.254 1.02 2.25 2.261 2.25 1.266 0 2.285-.996 2.285-2.25Zm8.227 0a2.256 2.256 0 1 0-4.512 0 2.243 2.243 0 0 0 2.25 2.25 2.246 2.246 0 0 0 2.262-2.25Zm8.262 0A2.256 2.256 0 0 0 19.25.746a2.26 2.26 0 0 0-2.285 2.262c0 1.254 1.008 2.25 2.285 2.25a2.253 2.253 0 0 0 2.262-2.25Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
