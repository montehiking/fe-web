import React from 'react';

import { MapControl } from 'src/components/atoms/MapControl';
import {
  FilterButton,
  Props as FilterButtonProps,
} from 'src/components/molecules/FilterButton';
import { GeolocationButton } from 'src/components/molecules/GeolocationButton';

type Props = {
  filter: FilterButtonProps;
  map: google.maps.Map;
};

export const ControlsLayout: React.FC<Props> = ({ filter, map }) => (
  <>
    <MapControl map={map} width="60px" height="80px">
      <FilterButton {...filter} />
    </MapControl>
    <MapControl map={map} width="60px" height="50px">
      <GeolocationButton map={map} />
    </MapControl>
  </>
);
