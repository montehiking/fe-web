import { LatLngLiteral } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { Props as FilterButtonProps } from 'src/components/atoms/FilterButton';
import { ControlsLayer } from 'src/components/molecules/ControlsLayer';
import { MarkersLayer } from 'src/components/molecules/MarkersLayer';
import { RoutesLayer } from 'src/components/molecules/RoutesLayer';
import { LatLng, MapState } from 'src/types';
import { getInitialZoom } from 'src/utils/maps';

import styles from 'src/components/molecules/Map/styles.module.css';

const INITIAL_CENTER: LatLngLiteral = {
  lat: 42.729601871834504,
  lng: 19.28824681389678,
};

type Props = {
  filter: FilterButtonProps;
  onClick: (latLng: LatLng) => void;
  state: MapState;
};

export const Map: React.FC<Props> = ({ filter, onClick, state }) => {
  return (
    <MapContainer
      center={INITIAL_CENTER}
      zoom={getInitialZoom()}
      className={styles.map}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        tileSize={128}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        zoomOffset={1}
      />
      <MarkersLayer points={state.points} onClick={onClick} />
      <RoutesLayer routes={state.routes} />
      <ControlsLayer filter={filter} />
    </MapContainer>
  );
};
