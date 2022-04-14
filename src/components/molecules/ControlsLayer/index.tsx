import { DomEvent } from 'leaflet';
import React, { useEffect, useRef } from 'react';
import { ZoomControl } from 'react-leaflet';

import {
  MapFilterButton,
  Props as MapFilterButtonProps,
} from 'src/components/atoms/MapFilterButton';
import { MapGeolocationButton } from 'src/components/atoms/MapGeolocationButton';

type Props = {
  filter: MapFilterButtonProps;
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
          <MapGeolocationButton />
        </div>

        <div className="leaflet-bar leaflet-control">
          <MapFilterButton {...filter} />
        </div>
      </div>
    </div>
  );
};
