import React from 'react';
import { MapContainer } from 'react-leaflet';

import { Props as MapFilterButtonProps } from 'src/components/atoms/MapFilterButton';
import { MapControlsLayer } from 'src/components/molecules/MapControlsLayer';
import { MapMarkersLayer } from 'src/components/molecules/MapMarkersLayer';
import { MapRoutesLayer } from 'src/components/molecules/MapRoutesLayer';
import { MapTilesLayer } from 'src/components/molecules/MapTilesLayer';
import { getPlace } from 'src/navigation';
import { MapState, SetPlace } from 'src/types';
import { getInitialZoom } from 'src/utils/maps';

import styles from 'src/components/molecules/Map/styles.module.css';

type Props = {
  filter: MapFilterButtonProps;
  onClick: SetPlace;
  state: MapState;
};

export const Map: React.FC<Props> = ({ filter, onClick, state }) => {
  const { zoom, ...center } = getPlace() || {
    lat: 42.729602,
    lng: 19.288247,
    zoom: getInitialZoom(),
  };

  return (
    <MapContainer
      center={center}
      className={styles.map}
      maxBoundsViscosity={1.0}
      zoom={zoom}
      zoomControl={false}
    >
      <MapTilesLayer />
      <MapMarkersLayer
        initialZoom={zoom}
        onClick={onClick}
        points={state.points}
      />
      <MapRoutesLayer routes={state.routes} />
      <MapControlsLayer filter={filter} />
    </MapContainer>
  );
};
