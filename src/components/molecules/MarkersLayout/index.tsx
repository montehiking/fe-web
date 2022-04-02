import React from 'react';
import { useIntl } from 'react-intl';

import { Marker } from 'src/components/atoms/Marker';
import { msg } from 'src/i18n/Msg';
import { Point } from 'src/types';
import { createGoogleMapsURL, getInitialZoom } from 'src/utils/maps';

type Props = {
  infoWindow: google.maps.InfoWindow;
  map: google.maps.Map;
  points: Point[];
};

export const MarkersLayout: React.FC<Props> = ({ infoWindow, map, points }) => {
  const intl = useIntl();

  const renderMarker = ({ properties, geometry }: Point) => {
    const iconName = properties.notVerified
      ? '/pin/yellow.svg'
      : '/pin/red.svg';
    const [lng, lat] = geometry.coordinates;

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
            <div class="title full-width">${properties.title}</div>
            <div class="point-description full-width">${properties.description}</div>
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
        icon={iconName}
        key={`${lat}${lng}`}
        map={map}
        onClick={onClick}
        position={{ lat, lng }}
        title={properties.title}
      />
    );
  };

  return <>{points.map(renderMarker)}</>;
};
