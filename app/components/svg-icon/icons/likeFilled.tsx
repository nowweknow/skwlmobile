import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg viewBox="0 0 24 21" width={24} height={21} fill="none" {...props}>
      <Path
        d="M12 20.578c.246 0 .61-.164.879-.34 6.234-3.996 10.195-8.648 10.195-13.383 0-3.96-2.73-6.761-6.234-6.761-2.18 0-3.844 1.207-4.84 3.035C11.004 1.312 9.34.094 7.16.094 3.656.094.926 2.894.926 6.855c0 4.735 3.96 9.387 10.195 13.383.27.176.633.34.879.34Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
