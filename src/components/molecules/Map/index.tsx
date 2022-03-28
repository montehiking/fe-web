import React from 'react';

import { Props as FilterButtonProps } from 'src/components/molecules/FilterButton';
import { MapControls } from 'src/components/molecules/MapControls';
import { MapMarkers } from 'src/components/molecules/MapMarkers';
import { Props as MapProps, useMap } from 'src/hooks/useMap';
import { Point } from 'src/types';

import styles from 'src/components/molecules/Map/styles.module.css';

type Props = MapProps & {
  markers: Point[];
  draggable: boolean;
  filter: FilterButtonProps;
};

export const Map: React.FC<Props> = ({
  markers,
  draggable,
  filter,
  ...options
}) => {
  const { ref, map, infoWindow, initialZoom } = useMap(options);

  return (
    <>
      <div ref={ref} className={styles.map} />

      {!!map && (
        <>
          <MapControls filter={filter} map={map} />

          <MapMarkers
            draggable={draggable}
            infoWindow={infoWindow}
            initialZoom={initialZoom}
            map={map}
            markers={markers}
          />
        </>
      )}
    </>
  );
};
