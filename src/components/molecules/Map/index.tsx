import { LatLngLiteral } from 'leaflet';
import React from 'react';
import { MapContainer } from 'react-leaflet';

import { Props as MapFilterButtonProps } from 'src/components/atoms/MapFilterButton';
import { MapControlsLayer } from 'src/components/molecules/MapControlsLayer';
import { MapMarkersLayer } from 'src/components/molecules/MapMarkersLayer';
import { MapRoutesLayer } from 'src/components/molecules/MapRoutesLayer';
import { MapTilesLayer } from 'src/components/molecules/MapTilesLayer';
import { LatLng, MapState } from 'src/types';
import { getInitialZoom } from 'src/utils/maps';

import styles from 'src/components/molecules/Map/styles.module.css';

type Props = {
  filter: MapFilterButtonProps;
  onClick: (latLng: LatLng) => void;
  state: MapState;
};

const INITIAL_CENTER: LatLngLiteral = {
  lat: 42.729601871834504,
  lng: 19.28824681389678,
};

export const Map: React.FC<Props> = ({ filter, onClick, state }) => (
  <MapContainer
    center={INITIAL_CENTER}
    className={styles.map}
    maxBoundsViscosity={1.0}
    zoom={getInitialZoom()}
    zoomControl={false}
  >
    <MapTilesLayer />
    <MapMarkersLayer points={state.points} onClick={onClick} />
    <MapRoutesLayer routes={state.routes} />
    <MapControlsLayer filter={filter} />
  </MapContainer>
);
