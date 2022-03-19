import { createContext } from 'react';

export const InfoWindowContext = createContext<{
  infoWindow?: google.maps.InfoWindow;
  zoom: number;
}>({ zoom: 1 });
