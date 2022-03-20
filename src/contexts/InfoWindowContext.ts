import { createContext } from 'react';

import { Zoom } from 'src/types';

export const InfoWindowContext = createContext<{
  infoWindow?: google.maps.InfoWindow;
  zoom: Zoom;
}>({ zoom: 1 });
