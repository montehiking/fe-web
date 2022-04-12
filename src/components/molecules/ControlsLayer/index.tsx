import React from 'react';

import {
  FilterButton,
  Props as FilterButtonProps,
} from 'src/components/atoms/FilterButton';
import { GeolocationButton } from 'src/components/atoms/GeolocationButton';

type Props = {
  filter: FilterButtonProps;
};

export const ControlsLayer: React.FC<Props> = ({ filter }) => (
  <div className="leaflet-bottom leaflet-right leaflet-custom-controls">
    <div className="leaflet-control leaflet-bar">
      <GeolocationButton />
    </div>

    <div className="leaflet-control leaflet-bar">
      <FilterButton {...filter} />
    </div>
  </div>
);
