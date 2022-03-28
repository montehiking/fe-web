import { useLayoutEffect, useMemo, useRef, useState } from 'react';

export type Props = google.maps.MapOptions & {
  onClick: (e: google.maps.MapMouseEvent) => void;
};

const INITIAL_CENTER: google.maps.LatLngLiteral = {
  lat: 42.729601871834504,
  lng: 19.28824681389678,
};

export const useMap = ({ onClick }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const infoWindow = useMemo(() => new global.google.maps.InfoWindow(), []);

  const [map, setMap] = useState<google.maps.Map>();

  const initialZoom = window.innerWidth > 700 ? 9 : 8;

  useLayoutEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        streetViewControl: false,
        zoom: initialZoom,
        center: INITIAL_CENTER,
      });

      ['click', 'idle'].forEach((eventName) =>
        google.maps.event.clearListeners(newMap, eventName)
      );

      newMap.addListener('click', (event: google.maps.MapMouseEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!!(infoWindow as any).map) {
          infoWindow.close();
        }

        onClick(event);
      });

      setMap(newMap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, map]);

  return { ref, map, initialZoom, infoWindow };
};
