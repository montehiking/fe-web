import React from 'react';
import { useIntl } from 'react-intl';

import { Marker } from 'src/components/atoms/Marker';
import { msg } from 'src/i18n/Msg';
import { Point } from 'src/types';
import { createGoogleMapsURL, getInitialZoom } from 'src/utils/maps';

type Props = {
  draggable: boolean;
  infoWindow: google.maps.InfoWindow;
  map: google.maps.Map;
  points: Point[];
};

export const MarkersLayout: React.FC<Props> = ({
  draggable,
  infoWindow,
  map,
  points,
}) => {
  const intl = useIntl();

  const renderMarker = ({ title, description, lat, lng }: Point) => {
    const onClick = (marker: google.maps.Marker) => {
      const oldPosition = infoWindow.getPosition();

      if (
        oldPosition?.lat() === lat &&
        oldPosition?.lng() === lng &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(infoWindow as any).map
      ) {
        infoWindow.close();
      } else {
        const url = createGoogleMapsURL(
          lat,
          lng,
          map.getZoom() ?? getInitialZoom()
        );

        const text = msg(intl, {
          id: 'components.molecules.MarkersLayout.tooltip.showOnGoogleMaps',
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
        key={`${lat}${lng}`}
        map={map}
        onClick={onClick}
        position={{ lat, lng }}
        title={title}
      />
    );
  };

  return <>{points.map(renderMarker)}</>;
};
