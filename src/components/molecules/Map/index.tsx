import { LatLngLiteral, latLngBounds } from 'leaflet';
import React from 'react';
import { MapContainer } from 'react-leaflet';

import { Props as FilterButtonProps } from 'src/components/atoms/FilterButton';
import { ControlsLayer } from 'src/components/molecules/ControlsLayer';
import { MarkersLayer } from 'src/components/molecules/MarkersLayer';
import { RoutesLayer } from 'src/components/molecules/RoutesLayer';
import { TilesLayer } from 'src/components/molecules/TilesLayer';
import { LatLng, MapState } from 'src/types';
import { getInitialZoom } from 'src/utils/maps';

import styles from 'src/components/molecules/Map/styles.module.css';

type Props = {
  filter: FilterButtonProps;
  onClick: (latLng: LatLng) => void;
  state: MapState;
};

const INITIAL_CENTER: LatLngLiteral = {
  lat: 42.729601871834504,
  lng: 19.28824681389678,
};

const bounds = latLngBounds(
  { lat: 43.62633853568137, lng: 18.419542768970132 },
  { lat: 41.58987278240003, lng: 20.446609323844317 }
);

export const Map: React.FC<Props> = ({ filter, onClick, state }) => (
  <MapContainer
    center={INITIAL_CENTER}
    className={styles.map}
    maxBounds={bounds}
    maxBoundsViscosity={1.0}
    zoom={getInitialZoom()}
    zoomControl={false}
  >
    <TilesLayer />
    <MarkersLayer points={state.points} onClick={onClick} />
    <RoutesLayer routes={state.routes} />
    <ControlsLayer filter={filter} />
  </MapContainer>
);
