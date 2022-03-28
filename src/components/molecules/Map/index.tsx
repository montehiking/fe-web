import React from 'react';
import { useIntl } from 'react-intl';

import { MapControl } from 'src/components/atoms/MapControl';
import { Marker } from 'src/components/atoms/Marker';
import {
  FilterButton,
  Props as FilterButtonProps,
} from 'src/components/molecules/FilterButton';
import { Props as MapProps, useMap } from 'src/hooks/useMap';
import { msg } from 'src/i18n/Msg';
import { Point } from 'src/types';
import { createGoogleMapsURL } from 'src/utils/maps';

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
  const intl = useIntl();
  const { ref, map, infoWindow, initialZoom } = useMap(options);

  return (
    <>
      <div ref={ref} className={styles.map} />

      {!!map && (
        <MapControl
          map={map}
          width="60px"
          height="80px"
          position={google.maps.ControlPosition.RIGHT_BOTTOM}
        >
          <FilterButton {...filter} />
        </MapControl>
      )}

      {!!map &&
        markers.map(({ type, title, description, ...latLng }) => (
          <Marker
            draggable={draggable}
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

                const text = msg(intl, {
                  id: 'components.molecules.Map.tooltip.showOnGoogleMaps',
                });

                infoWindow.setContent(
                  `<div class="poi-info-window gm-style">
                    <div class="title full-width">${title}</div>
                    <div class="point-description full-width">${description}</div>
                    <div class="address">
                      <a href="${url}" target="_blank">
                        <span>${text}</span>
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
