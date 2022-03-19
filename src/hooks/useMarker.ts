import { useContext, useEffect, useState } from 'react';

import { InfoWindowContext } from 'src/contexts/InfoWindowContext';

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
        const position = `${options.position?.lat},${options.position?.lng}`;

        infoWindow?.close();
        infoWindow?.setContent(
          `<div class="poi-info-window gm-style">
            <div class="title full-width">${marker.getTitle()}</div>
            <div class="address">
              <a href="https://maps.google.com/maps/place/${position}/@${position},${zoom}z" target="_blank">
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
