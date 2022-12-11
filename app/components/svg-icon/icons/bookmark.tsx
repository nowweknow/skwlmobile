import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={13} height={18} fill="none" {...props} viewBox="0 0 13 18">
      <Path
        d="M1.771 17.98c.422 0 .677-.238 1.416-.959l3.234-3.19a.132.132 0 0 1 .158 0l3.234 3.2c.739.711.994.949 1.415.949.59 0 .94-.405.94-1.082V2.44c0-1.6-.816-2.425-2.398-2.425H3.23C1.648.015.831.84.831 2.44v14.458c0 .677.352 1.082.94 1.082Zm.721-2.4c-.114.114-.246.08-.246-.079V2.484c0-.694.36-1.054 1.072-1.054h6.364c.712 0 1.072.36 1.072 1.054v13.017c0 .158-.132.193-.246.08l-3.533-3.429c-.29-.28-.66-.28-.95 0L2.492 15.58Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
