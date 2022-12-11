import React from 'react';

import { Image } from 'components';

export const Avatar = (props: { uri?: string; size?: number; }) => {
  const { uri, size } = props;
  return (
    <Image
      size={size || 48}
      shape={'circle'}
      source={uri ? ({ uri: uri }) : require('./def.jpg')}
    />
  );
};
