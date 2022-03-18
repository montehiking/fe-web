import { createContext } from 'react';

export const InfoWindowContext = createContext<
  google.maps.InfoWindow | undefined
>(undefined);
