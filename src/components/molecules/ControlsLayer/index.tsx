import { DomEvent } from 'leaflet';
import React, { useEffect, useRef } from 'react';
import { ZoomControl } from 'react-leaflet';

import {
  FilterButton,
  Props as FilterButtonProps,
} from 'src/components/atoms/FilterButton';
import { GeolocationButton } from 'src/components/atoms/GeolocationButton';

type Props = {
  filter: FilterButtonProps;
};

export const ControlsLayer: React.FC<Props> = ({ filter }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      DomEvent.disableClickPropagation(ref.current);
    }
  });

  return (
    <div className="leaflet-control-container" ref={ref}>
      <ZoomControl position="topright" />

      <div className="leaflet-bottom leaflet-right leaflet-custom-controls">
        <div className="leaflet-bar leaflet-control">
          <GeolocationButton />
        </div>

        <div className="leaflet-bar leaflet-control">
          <FilterButton {...filter} />
        </div>
      </div>
    </div>
  );
};
