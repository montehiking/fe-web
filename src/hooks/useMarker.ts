import { useContext, useEffect, useState } from 'react';

import { InfoWindowContext } from 'src/contexts/InfoWindowContext';

export type Props = google.maps.MarkerOptions;

export const useMarker = (options: Props) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  const infoWindow = useContext(InfoWindowContext);

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
        infoWindow?.setContent(marker.getTitle());
        infoWindow?.open(marker.getMap(), marker);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker, options]);
};
