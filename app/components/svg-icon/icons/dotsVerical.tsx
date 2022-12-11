import * as React from 'react';
import Svg, {SvgProps, Circle} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={47} height={44} fill="none" {...props}>
      <Circle cx={23.5} cy={30} r={2.5} transform="rotate(-90 23.5 30)" fill={color} />
      <Circle cx={23.5} cy={22} r={2.5} transform="rotate(-90 23.5 22)" fill={color} />
      <Circle cx={23.5} cy={14} r={2.5} transform="rotate(-90 23.5 14)" fill={color} />
    </Svg>
  );
}
export default React.memo(SvgComponent);
