import React, { useLayoutEffect } from 'react';

type Props = google.maps.PolylineOptions & {
  onClick: (
    e: google.maps.MapMouseEvent,
    polyline: google.maps.Polyline
  ) => void;
};

export const Polyline: React.FC<Props> = ({ onClick, ...options }) => {
  useLayoutEffect(() => {
    let polyline: google.maps.Polyline | undefined = undefined;
    let listener: google.maps.MapsEventListener | undefined = undefined;

    if (!polyline) {
      polyline = new google.maps.Polyline({
        ...options,
      });

      listener = polyline.addListener('click', (e: google.maps.MapMouseEvent) =>
        onClick(e, polyline as google.maps.Polyline)
      );
    }

    return () => {
      if (listener) {
        listener.remove();
      }

      if (polyline) {
        polyline.setMap(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
