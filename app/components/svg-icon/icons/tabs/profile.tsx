import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={48} height={49} fill="none" {...props}>
      <Path
        opacity={0.6}
        d="M9.963 44h1.094v-2.407h1.65c1.382 0 2.339-.943 2.339-2.32v-.01c0-1.381-.957-2.309-2.34-2.309H9.964V44Zm2.47-6.123c.948 0 1.5.513 1.5 1.392v.01c0 .883-.552 1.396-1.5 1.396h-1.377v-2.798h1.378ZM16.093 44h1.06v-3.169c0-.767.552-1.265 1.363-1.265.2 0 .38.025.57.064v-.977a2.329 2.329 0 0 0-.463-.048c-.708 0-1.201.332-1.392.893h-.078v-.8h-1.06V44Zm5.873.102c1.552 0 2.505-1.04 2.505-2.748v-.01c0-1.71-.957-2.75-2.505-2.75-1.553 0-2.51 1.046-2.51 2.75v.01c0 1.709.952 2.748 2.51 2.748Zm0-.883c-.913 0-1.426-.689-1.426-1.866v-.01c0-1.176.513-1.865 1.426-1.865.908 0 1.426.689 1.426 1.866v.01c0 1.171-.518 1.865-1.426 1.865ZM25.87 44h1.055v-4.468h1.167v-.835h-1.177v-.508c0-.537.23-.82.816-.82.165 0 .307.01.405.025v-.777a3.867 3.867 0 0 0-.625-.049c-1.104 0-1.64.518-1.64 1.573v.556h-.875v.835h.874V44Zm3.724-6.25a.667.667 0 0 0 .664-.66.665.665 0 0 0-1.328 0c0 .362.298.66.664.66ZM29.062 44h1.054v-5.303h-1.054V44Zm2.405 0h1.06v-7.383h-1.06V44Zm4.622.102c1.357 0 2.09-.78 2.266-1.479l.01-.044-1.021.005-.02.039c-.127.274-.532.61-1.21.61-.875 0-1.431-.59-1.45-1.606h3.759v-.371c0-1.592-.908-2.661-2.388-2.661S33.6 39.703 33.6 41.358v.005c0 1.68.937 2.74 2.49 2.74Zm-.049-4.638c.718 0 1.25.459 1.333 1.406h-2.695c.093-.913.64-1.406 1.362-1.406Z"
        fill={color}
      />
      <Path
        d="M24 19.156c1.976 0 3.586-1.76 3.586-3.901 0-2.125-1.602-3.794-3.586-3.794-1.967 0-3.586 1.702-3.586 3.81.008 2.134 1.61 3.885 3.586 3.885Zm0-1.253c-1.212 0-2.25-1.162-2.25-2.631 0-1.445 1.021-2.557 2.25-2.557 1.237 0 2.25 1.095 2.25 2.54 0 1.47-1.03 2.648-2.25 2.648Zm-5.221 8.931h10.434c1.378 0 2.034-.415 2.034-1.328 0-2.175-2.748-5.32-7.247-5.32-4.507 0-7.255 3.145-7.255 5.32 0 .913.656 1.328 2.034 1.328Zm-.39-1.253c-.216 0-.308-.058-.308-.232 0-1.362 2.109-3.91 5.919-3.91 3.802 0 5.91 2.548 5.91 3.91 0 .174-.083.232-.299.232H18.39Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
