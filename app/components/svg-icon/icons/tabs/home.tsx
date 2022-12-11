import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={48} height={49} fill="none" {...props}>
      <Path
        opacity={0.6}
        d="M11.08 44h1.094v-3.12h3.618V44h1.09v-7.046h-1.09v2.979h-3.618v-2.979h-1.093V44Zm9.452.102c1.552 0 2.505-1.04 2.505-2.748v-.01c0-1.71-.957-2.75-2.505-2.75-1.553 0-2.51 1.046-2.51 2.75v.01c0 1.709.952 2.748 2.51 2.748Zm0-.883c-.913 0-1.426-.689-1.426-1.866v-.01c0-1.176.513-1.865 1.426-1.865.908 0 1.425.689 1.425 1.866v.01c0 1.171-.517 1.865-1.425 1.865ZM24.06 44h1.06v-3.257c0-.693.473-1.24 1.113-1.24.625 0 1.02.38 1.02.986V44h1.055v-3.355c0-.64.445-1.142 1.118-1.142.694 0 1.026.361 1.026 1.094V44h1.054v-3.657c0-1.104-.625-1.748-1.694-1.748-.737 0-1.348.376-1.616.947h-.083c-.235-.571-.747-.947-1.47-.947-.693 0-1.21.337-1.445.918h-.078v-.816h-1.06V44Zm10.911.102c1.358 0 2.09-.78 2.266-1.479l.01-.044-1.02.005-.02.039c-.127.274-.533.61-1.211.61-.874 0-1.431-.59-1.45-1.606h3.76v-.371c0-1.592-.909-2.661-2.389-2.661-1.479 0-2.436 1.108-2.436 2.763v.005c0 1.68.938 2.74 2.49 2.74Zm-.049-4.638c.718 0 1.25.459 1.333 1.406H33.56c.093-.913.64-1.406 1.362-1.406Z"
        fill={color}
      />
      <Path
        d="M14.089 18.542c0 .34.265.664.714.664.232 0 .423-.125.597-.266l1.08-.913v7.92c0 1.161.689 1.834 1.875 1.834h11.231c1.18 0 1.868-.673 1.868-1.835V17.97l1.154.971c.166.141.357.266.59.266.39 0 .705-.24.705-.64a.68.68 0 0 0-.258-.564l-2.19-1.842v-3.437c0-.365-.233-.598-.599-.598h-.888c-.357 0-.597.233-.597.598v1.685l-4.367-3.669c-.614-.523-1.378-.523-2 0l-8.65 7.263a.694.694 0 0 0-.265.54Zm12.302 2.34c0-.381-.25-.63-.631-.63h-3.52c-.39 0-.639.249-.639.63v5.562h-2.963c-.532 0-.822-.299-.822-.838v-8.7l5.893-4.938c.183-.166.407-.166.59 0l5.819 4.88v8.758c0 .54-.29.838-.814.838h-2.913v-5.561Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);