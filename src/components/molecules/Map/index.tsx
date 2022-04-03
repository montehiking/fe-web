import React from 'react';

import { ControlsLayout } from 'src/components/molecules/ControlsLayout';
import { Props as FilterButtonProps } from 'src/components/molecules/FilterButton';
import { MarkersLayout } from 'src/components/molecules/MarkersLayout';
import { RoutesLayout } from 'src/components/molecules/RoutesLayout';
import { Props as MapProps, useMap } from 'src/hooks/useMap';
import { MapState } from 'src/types';

import styles from 'src/components/molecules/Map/styles.module.css';

type Props = MapProps & {
  filter: FilterButtonProps;
  state: MapState;
};

export const Map: React.FC<Props> = ({ filter, state, ...options }) => {
  const { ref, map, infoWindow } = useMap(options);

  return (
    <>
      <div ref={ref} className={styles.map} />

      {!!map && (
        <>
          <ControlsLayout filter={filter} map={map} />

          <MarkersLayout
            infoWindow={infoWindow}
            map={map}
            points={state.points}
          />

          <RoutesLayout
            infoWindow={infoWindow}
            map={map}
            routes={state.routes}
          />
        </>
      )}
    </>
  );
};
