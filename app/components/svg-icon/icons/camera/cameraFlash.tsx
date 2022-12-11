import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={26} height={26} fill="none" {...props} viewBox={'0 0 26 26'}>
      <Path
        d="M13 25.65c6.811 0 12.451-5.64 12.451-12.451 0-6.8-5.652-12.451-12.463-12.451-6.8 0-12.44 5.651-12.44 12.45C.549 20.01 6.202 25.65 13 25.65ZM7.495 14.065c0-.158.073-.341.207-.488L14.6 4.91c.525-.647 1.392-.207 1.086.598l-2.282 6.116h4.272c.33 0 .574.232.574.55a.808.808 0 0 1-.207.5l-6.898 8.655c-.524.647-1.391.207-1.086-.599l2.283-6.115H8.068c-.33 0-.573-.232-.573-.55Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
