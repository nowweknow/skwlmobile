import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={7} height={10} viewBox="0 0 7 10" {...props}>
      <Path
        d="M6.463 4.998a.559.559 0 0 0-.176-.41L1.916.316a.545.545 0 0 0-.393-.164c-.31 0-.55.24-.55.551 0 .152.058.293.158.393l3.99 3.902-3.99 3.897a.564.564 0 0 0-.158.392c0 .317.24.557.55.557a.545.545 0 0 0 .393-.164l4.371-4.272a.569.569 0 0 0 .176-.41Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
