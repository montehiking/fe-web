import { useContext, useEffect, useState } from 'react';

import { InfoWindowContext } from 'src/contexts/InfoWindowContext';
import { Coordinate } from 'src/types';
import { createGoogleMapsURL } from 'src/utils/maps';

export type Props = google.maps.MarkerOptions;

export const useMarker = (options: Props) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  const { infoWindow, zoom } = useContext(InfoWindowContext);

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);

      marker.addListener('click', () => {
        infoWindow?.close();
        infoWindow?.setContent(
          `<div class="poi-info-window gm-style">
            <div class="title full-width">${marker.getTitle()}</div>
            <div class="address">
              <a href="${createGoogleMapsURL(
                options.position?.lat as Coordinate,
                options.position?.lng as Coordinate,
                zoom
              )}" target="_blank">
                <span>Показать на Google Картах</span>
              </a>
            </div>
          </div>`
        );
        infoWindow?.open(marker.getMap(), marker);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker, options, zoom]);
};
