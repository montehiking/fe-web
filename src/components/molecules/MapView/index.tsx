import { Wrapper } from '@googlemaps/react-wrapper';
import React, { useState } from 'react';

import { Map } from 'src/components/atoms/Map';
import { Marker } from 'src/components/atoms/Marker';
import { Sidebar } from 'src/components/atoms/Sidebar';
import { GOOGLE_MAPS_API_KEY } from 'src/constants/env';

import styles from 'src/components/molecules/MapView/styles.module.css';

export const MapView: React.FC = () => {
  const [markers, setMarkers] = useState<google.maps.LatLng[]>([]);

  const onClick = ({ latLng }: google.maps.MapMouseEvent) => {
    if (latLng) {
      setMarkers([...markers, latLng]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Wrapper apiKey={GOOGLE_MAPS_API_KEY}>
        <Map onClick={onClick}>
          {markers.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>

      <Sidebar>
        {markers.map((latLng, i) => (
          <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
        ))}

        <button onClick={() => setMarkers([])}>Clear</button>
      </Sidebar>
    </div>
  );
};
