import React from 'react';

import { Marker } from 'src/components/atoms/Marker';
import { Props as MapProps, useMap } from 'src/hooks/useMap';
import { Point } from 'src/points';
import { createGoogleMapsURL } from 'src/utils/maps';

import styles from 'src/components/molecules/Map/styles.module.css';

type Props = MapProps & {
  markers: Point[];
  isAdmin: boolean;
};

export const Map: React.FC<Props> = ({ markers, isAdmin, ...options }) => {
  const { ref, map, infoWindow, initialZoom } = useMap(options);

  return (
    <>
      <div ref={ref} className={styles.map} />

      {!!map &&
        markers.map(({ type, title, description, ...latLng }) => (
          <Marker
            draggable={isAdmin}
            key={`${latLng.lat}${latLng.lng}`}
            label={type ? type.charAt(0).toUpperCase() : undefined}
            map={map}
            optimized
            position={latLng}
            title={title}
            onClick={(marker) => {
              const oldPosition = infoWindow.getPosition();

              if (
                oldPosition?.lat() === latLng.lat &&
                oldPosition?.lng() === latLng.lng &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                !!(infoWindow as any).map
              ) {
                infoWindow.close();
              } else {
                const url = createGoogleMapsURL(
                  latLng.lat,
                  latLng.lng,
                  map?.getZoom() ?? initialZoom
                );

                infoWindow.setContent(
                  `<div class="poi-info-window gm-style">
                    <div class="title full-width">${title}</div>
                    <div class="point-description full-width">${description}</div>
                    <div class="address">
                      <a href="${url}" target="_blank">
                        <span>Показать на Google Картах</span>
                      </a>
                    </div>
                  </div>`
                );
                infoWindow.open(map, marker);
              }
            }}
          />
        ))}
    </>
  );
};
