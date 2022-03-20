import React, { useEffect } from 'react';

type Props = google.maps.MarkerOptions & {
  onClick: (marker: google.maps.Marker) => void;
};

export const Marker: React.FC<Props> = ({ onClick, ...options }) => {
  useEffect(() => {
    let marker: google.maps.Marker | undefined = undefined;
    let listener: google.maps.MapsEventListener | undefined = undefined;

    if (!marker) {
      marker = new google.maps.Marker();

      marker.setOptions(options);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      listener = marker.addListener('click', () => onClick(marker!));
    }

    return () => {
      if (listener) {
        listener.remove();
      }

      if (marker) {
        marker.setMap(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
