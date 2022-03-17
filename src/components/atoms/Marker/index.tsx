import React from 'react';

import { Props, useMarker } from 'src/hooks/useMarker';

export const Marker: React.FC<Props> = (options) => {
  useMarker(options);

  return null;
};
