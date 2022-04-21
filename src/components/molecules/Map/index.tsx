import React from 'react';
import { MapContainer } from 'react-leaflet';

import { Props as MapFilterButtonProps } from 'src/components/atoms/MapFilterButton';
import { MapControlsLayer } from 'src/components/molecules/MapControlsLayer';
import { MapMarkersLayer } from 'src/components/molecules/MapMarkersLayer';
import { MapRoutesLayer } from 'src/components/molecules/MapRoutesLayer';
import { MapTilesLayer } from 'src/components/molecules/MapTilesLayer';
import { MapState, Place, SetPlace, SetZoom } from 'src/types';

import styles from 'src/components/molecules/Map/styles.module.css';

type Props = {
  filter: MapFilterButtonProps;
  initial: Place;
  onClick: SetPlace;
  onZoom: SetZoom;
  state: MapState;
};

export const Map: React.FC<Props> = ({
  filter,
  initial: { zoom, ...center },
  onClick,
  onZoom,
  state,
}) => (
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
      onZoom={onZoom}
      points={state.points}
    />
    <MapRoutesLayer routes={state.routes} />
    <MapControlsLayer filter={filter} />
  </MapContainer>
);
