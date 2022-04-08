import React, { useLayoutEffect } from 'react';

type Props = google.maps.PolylineOptions & {
  onClick: (
    e: google.maps.MapMouseEvent,
    polyline: google.maps.Polyline
  ) => void;
};

type Line = {
  polyline: google.maps.Polyline;
  from: google.maps.Marker;
  to: google.maps.Marker;
};

type Listeners = {
  polyline: google.maps.MapsEventListener;
  from: google.maps.MapsEventListener;
  to: google.maps.MapsEventListener;
};

export const Polyline: React.FC<Props> = ({ onClick, ...options }) => {
  useLayoutEffect(() => {
    let line: Line | undefined;
    let listeners: Listeners | undefined;

    if (!line) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const paths = options.path as any;

      line = {
        polyline: new google.maps.Polyline({
          ...options,
        }),
        from: new google.maps.Marker({
          ...options,
          optimized: true,
          icon: '/pin/blue.svg',
          position: paths[0],
        }),
        to: new google.maps.Marker({
          ...options,
          optimized: true,
          icon: '/pin/blue.svg',
          position: paths[paths.length - 1],
        }),
      };

      listeners = {
        polyline: line.polyline.addListener(
          'click',
          (e: google.maps.MapMouseEvent) =>
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClick(e, line!.polyline as google.maps.Polyline)
        ),
        from: line.from.addListener('click', (e: google.maps.MapMouseEvent) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick(e, (line as any).from)
        ),
        to: line.to.addListener('click', (e: google.maps.MapMouseEvent) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick(e, (line as any).to)
        ),
      };
    }

    return () => {
      if (listeners) {
        listeners.polyline.remove();
        listeners.from.remove();
        listeners.to.remove();
      }

      if (line) {
        line.polyline.setMap(null);
        line.from.setMap(null);
        line.to.setMap(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
