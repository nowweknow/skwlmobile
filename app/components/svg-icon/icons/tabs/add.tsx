import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={40} height={41} viewBox="0 0 40 41" {...props}>
      <Path
        d="M18 35.093c9.536 0 17.432-7.913 17.432-17.432C35.432 8.125 27.519.23 17.982.23 8.465.23.569 8.125.569 17.661c0 9.52 7.913 17.432 17.432 17.432Zm-7.793-17.415c0-.888.632-1.504 1.521-1.504h4.785V11.39c0-.888.598-1.52 1.47-1.52.889 0 1.504.614 1.504 1.52v4.785h4.802c.872 0 1.504.616 1.504 1.504 0 .872-.632 1.453-1.504 1.453h-4.802v4.82c0 .87-.615 1.486-1.504 1.486-.872 0-1.47-.615-1.47-1.487v-4.82h-4.785c-.889 0-1.521-.58-1.521-1.452Z"
        fill="#FF0390"
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
