import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={18} height={18} fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        d="M.48 17.54c.422.41 1.114.41 1.512 0L9 10.53l7.008 7.008c.41.41 1.101.422 1.512 0 .41-.422.421-1.113.011-1.523l-7.008-7.008 7.008-6.996c.41-.41.41-1.114-.011-1.524a1.082 1.082 0 0 0-1.512 0L9 7.496 1.992.488a1.072 1.072 0 0 0-1.512 0 1.097 1.097 0 0 0 0 1.524l6.997 6.996L.48 16.016c-.41.41-.421 1.113 0 1.523Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
