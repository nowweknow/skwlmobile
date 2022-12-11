import * as React from 'react';
import Svg, {SvgProps, Path, G} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg viewBox="0 0 60.249 62.184" width={32} height={32} {...props}>
      <G data-name="Group 43" fill="none" stroke={color} strokeLinecap="round" strokeWidth={6}>
        <Path data-name="Line 1" d="M30.124 2.5v57.184" />
        <Path data-name="Line 2" d="M57.749 31.092H2.5" />
      </G>
    </Svg>
  );
}
export default React.memo(SvgComponent);
