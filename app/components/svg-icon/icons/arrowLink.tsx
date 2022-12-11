import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={11} height={11} fill="none" {...props}>
      <Path
        d="M10.477 7.628 10.47.895c0-.41-.269-.694-.694-.694H3.043a.655.655 0 0 0-.672.652c0 .34.304.63.651.63h2.343l3.144-.1L7.27 2.468.72 9.03a.667.667 0 0 0-.204.46c0 .34.311.666.672.666a.63.63 0 0 0 .453-.198L8.205 3.4l1.097-1.239-.12 3.002V7.65c0 .347.29.659.644.659.347 0 .651-.29.651-.68Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
