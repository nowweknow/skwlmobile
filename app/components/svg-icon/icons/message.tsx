import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg viewBox="0 0 26 24" width={26} height={24} fill="none" {...props}>
      <Path
        d="M7.363 23.3c.446 0 .762-.222 1.301-.714l4.031-3.668 7.418.012c3.305.011 5.11-1.852 5.11-5.121V5.277c0-3.257-1.805-5.109-5.11-5.109H5.875C2.57.168.754 2.02.754 5.278v8.53c0 3.27 1.828 5.11 5.098 5.11h.492v3.223c0 .703.375 1.16 1.02 1.16ZM7.117 6.438a.683.683 0 0 1-.68-.69c0-.364.305-.669.68-.669h11.625c.375 0 .68.305.68.668a.683.683 0 0 1-.68.691H7.117Zm0 3.692a.68.68 0 0 1 0-1.36h11.625a.68.68 0 0 1 0 1.36H7.117Zm0 3.715a.68.68 0 0 1-.68-.68c0-.387.305-.691.68-.691h7.559c.386 0 .68.304.68.691 0 .375-.293.68-.68.68H7.117Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
