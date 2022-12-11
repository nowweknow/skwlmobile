import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={28} height={28} fill="none" {...props}>
      <Path
        d="M18.468 9.86V7.104c0-.388-.315-.637-.689-.564l-3.764.82c-.47.103-.725.36-.725.77l.014 8.144c.037.36-.132.594-.454.66l-1.165.241c-1.464.308-2.153 1.055-2.153 2.16 0 1.122.864 1.905 2.08 1.905 1.077 0 2.688-.79 2.688-2.922v-6.702c0-.388.073-.469.418-.542l3.347-.732a.48.48 0 0 0 .403-.484Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
