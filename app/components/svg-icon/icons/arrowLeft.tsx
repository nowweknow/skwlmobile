import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={24} height={24} viewBox="0 0 14 12" fill="none" {...props}>
      <Path
        d="M.094 5.664c0 .195.086.375.242.524l4.898 4.898a.725.725 0 0 0 .508.219c.399 0 .696-.29.696-.688a.716.716 0 0 0-.196-.5l-1.656-1.68-2.39-2.18 1.773.11h9.226c.414 0 .703-.289.703-.703 0-.422-.289-.71-.703-.71H3.97l-1.766.109 2.383-2.18 1.656-1.68a.716.716 0 0 0 .196-.5.671.671 0 0 0-.696-.687c-.18 0-.351.07-.523.234L.336 5.133a.733.733 0 0 0-.242.531Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
