import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={20} height={16} viewBox="0 0 20 16" {...props}>
      <Path
        d="M2.772 15.143h14.283c1.758 0 2.645-.888 2.645-2.62V3.497c0-1.731-.887-2.62-2.645-2.62H2.772c-1.757 0-2.654.88-2.654 2.62v9.026c0 1.74.897 2.62 2.654 2.62ZM1.56 3.585c0-.844.448-1.274 1.256-1.274h14.195c.8 0 1.257.43 1.257 1.274v.642H1.56v-.642Zm1.256 10.116c-.808 0-1.256-.43-1.256-1.274V6.134h16.708v6.293c0 .844-.457 1.274-1.257 1.274H2.816Zm1.108-1.556h2.039c.492 0 .817-.325.817-.79V9.816c0-.474-.325-.8-.817-.8h-2.04c-.483 0-.817.326-.817.8v1.538c0 .466.334.792.818.792Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
