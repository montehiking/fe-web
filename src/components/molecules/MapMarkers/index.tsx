import React from 'react';
import { useIntl } from 'react-intl';

import { Marker } from 'src/components/atoms/Marker';
import { msg } from 'src/i18n/Msg';
import { Point, Zoom } from 'src/types';
import { createGoogleMapsURL } from 'src/utils/maps';

type Props = {
  draggable: boolean;
  infoWindow: google.maps.InfoWindow;
  initialZoom: Zoom;
  map: google.maps.Map;
  markers: Point[];
};

export const MapMarkers: React.FC<Props> = ({
  draggable,
  infoWindow,
  initialZoom,
  map,
  markers,
}) => {
  const intl = useIntl();

  const renderMarker = ({ type, title, description, ...latLng }: Point) => {
    const onClick = (marker: google.maps.Marker) => {
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
          id: 'components.molecules.MapMarkers.tooltip.showOnGoogleMaps',
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
    };

    return (
      <Marker
        draggable={draggable}
        key={`${latLng.lat}${latLng.lng}`}
        map={map}
        optimized
        position={latLng}
        title={title}
        onClick={onClick}
      />
    );
  };

  return <>{markers.map(renderMarker)}</>;
};
