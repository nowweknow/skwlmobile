import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <Path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </Svg>
  );
}
export default React.memo(SvgComponent);
