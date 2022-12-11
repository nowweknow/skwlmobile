import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  const {color} = props;
  return (
    <Svg width={60} height={49} fill="none" {...props}>
      <Path
        opacity={0.6}
        d="M.907 44h.996v-5.17h.078L4.046 44h.81l2.071-5.17H7V44h.996v-7.046h-1.26l-2.245 5.62h-.079l-2.246-5.62H.906V44Zm9.949.088c.703 0 1.26-.303 1.572-.84h.083V44h1.05v-3.628c0-1.113-.752-1.777-2.085-1.777-1.206 0-2.041.58-2.168 1.45l-.005.034h1.02l.005-.02c.127-.375.513-.59 1.1-.59.717 0 1.083.322 1.083.903v.469l-1.435.083c-1.265.078-1.978.63-1.978 1.577v.01c0 .962.747 1.577 1.758 1.577Zm-.703-1.621v-.01c0-.479.332-.742 1.064-.786l1.294-.083v.454c0 .684-.581 1.201-1.372 1.201-.571 0-.986-.288-.986-.776ZM14.813 44h1.06v-3.169c0-.767.552-1.265 1.363-1.265.2 0 .38.025.571.064v-.977a2.33 2.33 0 0 0-.464-.048c-.708 0-1.201.332-1.392.893h-.078v-.8h-1.06V44Zm3.812 0h1.06v-1.929l.454-.454L21.965 44h1.29l-2.36-3.066 2.213-2.237h-1.24l-2.105 2.237h-.078v-4.317h-1.06V44Zm7.308.102c1.358 0 2.09-.78 2.266-1.479l.01-.044-1.021.005-.02.039c-.127.274-.532.61-1.21.61-.875 0-1.431-.59-1.45-1.606h3.759v-.371c0-1.592-.908-2.661-2.388-2.661s-2.436 1.108-2.436 2.763v.005c0 1.68.937 2.74 2.49 2.74Zm-.049-4.638c.718 0 1.25.459 1.333 1.406h-2.695c.093-.913.64-1.406 1.362-1.406Zm5.404 4.57c.205 0 .4-.024.57-.053v-.845a3.48 3.48 0 0 1-.4.02c-.522 0-.737-.235-.737-.806v-2.818h1.138v-.835H30.72V37.36h-1.079v1.338h-.83v.835h.83v3.072c0 1.02.479 1.43 1.646 1.43Zm4.18-.034h1.094v-2.407h1.65c1.382 0 2.34-.943 2.34-2.32v-.01c0-1.381-.958-2.309-2.34-2.309h-2.744V44Zm2.471-6.123c.947 0 1.499.513 1.499 1.392v.01c0 .883-.552 1.396-1.499 1.396h-1.377v-2.798h1.377ZM41.648 44h1.06v-7.383h-1.06V44Zm3.85.088c.704 0 1.26-.303 1.573-.84h.083V44h1.05v-3.628c0-1.113-.752-1.777-2.085-1.777-1.206 0-2.041.58-2.168 1.45l-.005.034h1.02l.005-.02c.127-.375.513-.59 1.099-.59.718 0 1.084.322 1.084.903v.469l-1.436.083c-1.264.078-1.977.63-1.977 1.577v.01c0 .962.747 1.577 1.758 1.577Zm-.703-1.621v-.01c0-.479.333-.742 1.065-.786l1.294-.083v.454c0 .684-.581 1.201-1.372 1.201-.571 0-.986-.288-.986-.776Zm6.893 1.636c1.314 0 2.07-.709 2.26-1.739l.01-.044h-1.015l-.01.025c-.17.571-.58.874-1.245.874-.874 0-1.416-.713-1.416-1.885v-.01c0-1.142.532-1.846 1.416-1.846.703 0 1.133.391 1.25.914l.005.014 1.016-.005v-.024c-.147-1.03-.943-1.782-2.276-1.782-1.548 0-2.49 1.05-2.49 2.73v.009c0 1.714.947 2.768 2.495 2.768Zm5.457 0c1.358 0 2.09-.782 2.266-1.48l.01-.044-1.02.005-.02.039c-.127.274-.533.61-1.211.61-.874 0-1.431-.59-1.45-1.606h3.76v-.371c0-1.592-.909-2.661-2.388-2.661-1.48 0-2.437 1.108-2.437 2.763v.005c0 1.68.938 2.74 2.49 2.74Zm-.049-4.64c.718 0 1.25.46 1.333 1.407h-2.695c.093-.913.64-1.406 1.362-1.406Z"
        fill={color}
      />
      <Path
        d="M26.954 23.722h9.687a.613.613 0 0 0 .606-.623.613.613 0 0 0-.606-.622h-9.546c-.473 0-.764-.332-.839-.839l-.133-.871h10.534c1.212 0 1.835-.747 2.009-1.934l.664-4.392c.017-.107.033-.24.033-.315 0-.399-.298-.672-.755-.672H25.053l-.158-1.055c-.083-.639-.315-.962-1.162-.962h-2.914a.631.631 0 0 0-.614.622c0 .34.282.63.614.63h2.806l1.328 9.115c.174 1.179.797 1.918 2 1.918Zm10.998-9.015-.59 3.976c-.066.515-.34.83-.83.83l-10.591.008-.706-4.814h12.717ZM27.61 27.756c.747 0 1.345-.59 1.345-1.345a1.34 1.34 0 0 0-1.345-1.345c-.755 0-1.353.598-1.353 1.345 0 .755.598 1.345 1.353 1.345Zm7.762 0c.755 0 1.353-.59 1.353-1.345a1.34 1.34 0 0 0-1.353-1.345c-.748 0-1.353.598-1.353 1.345a1.34 1.34 0 0 0 1.353 1.345Z"
        fill={color}
      />
    </Svg>
  );
}
export default React.memo(SvgComponent);
