import React from 'react';

import { MapControl } from 'src/components/atoms/MapControl';
import {
  FilterButton,
  Props as FilterButtonProps,
} from 'src/components/molecules/FilterButton';

type Props = {
  filter: FilterButtonProps;
  map: google.maps.Map;
};

export const MapControls: React.FC<Props> = ({ filter, map }) => (
  <MapControl map={map} width="60px" height="80px">
    <FilterButton {...filter} />
  </MapControl>
);
