import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={18} height={18} fill="none" {...props}>
      <Path
        d="M.89 7.446a6.632 6.632 0 0 0 6.624 6.624 6.566 6.566 0 0 0 3.852-1.245l4.084 4.093c.19.19.44.282.705.282.565 0 .955-.424.955-.98 0-.265-.1-.506-.274-.68l-4.06-4.084a6.547 6.547 0 0 0 1.362-4.01A6.632 6.632 0 0 0 7.514.822 6.632 6.632 0 0 0 .89 7.446Zm1.42 0a5.208 5.208 0 0 1 5.204-5.204 5.208 5.208 0 0 1 5.205 5.204 5.208 5.208 0 0 1-5.205 5.205A5.208 5.208 0 0 1 2.31 7.446Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
