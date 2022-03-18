import { Wrapper } from '@googlemaps/react-wrapper';
import React, { useState } from 'react';

import { Map } from 'src/components/atoms/Map';
import { Marker } from 'src/components/atoms/Marker';
import { Sidebar } from 'src/components/atoms/Sidebar';
import { GOOGLE_MAPS_API_KEY } from 'src/constants/env';
import { Point, points } from 'src/points';

import styles from 'src/components/molecules/MapView/styles.module.css';

type Props = {
  isAdmin: boolean;
};

export const MapView: React.FC<Props> = ({ isAdmin }) => {
  const [markers, setMarkers] = useState<Point[]>(points);

  const onClick = ({ latLng }: google.maps.MapMouseEvent) => {
    if (latLng && isAdmin) {
      setMarkers([...markers, { ...latLng.toJSON(), type: '', title: '' }]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Wrapper apiKey={GOOGLE_MAPS_API_KEY}>
        <Map onClick={onClick}>
          {markers.map(({ type, title, ...latLng }, i) => (
            <Marker
              key={i}
              position={latLng}
              title={title}
              label={type ? type.charAt(0).toUpperCase() : undefined}
              draggable={isAdmin}
              optimized
            />
          ))}
        </Map>
      </Wrapper>

      {isAdmin && (
        <Sidebar>
          <pre className={styles.code}>
            {JSON.stringify(
              markers.filter((m) => !m.type),
              null,
              2
            )}
          </pre>

          <button onClick={() => setMarkers([])}>Clear</button>
        </Sidebar>
      )}
    </div>
  );
};
