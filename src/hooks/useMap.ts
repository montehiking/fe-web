import { isLatLngLiteral } from '@googlemaps/typescript-guards';
import { createCustomEqual } from 'fast-equals';
import { useEffect, useRef, useState } from 'react';

export type Props = google.maps.MapOptions & {
  onClick: (e: google.maps.MapMouseEvent) => void;
};

const INITIAL_ZOOM = 9;
const INITIAL_CENTER: google.maps.LatLngLiteral = {
  lat: 42.729601871834504,
  lng: 19.28824681389678,
};

const deepCompareEqualsForMaps = createCustomEqual(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      isLatLngLiteral(b) ||
      a instanceof google.maps.LatLng ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // Other objects
    return deepEqual(a, b);
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export const useMap = ({ onClick }: Props) => {
  const InfoWindow = global?.google?.maps.InfoWindow;

  const ref = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<google.maps.Map>();
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();

  const options = { zoom, center };

  const handler = (event: google.maps.MapMouseEvent) => {
    infoWindow?.close();
    onClick(event);
  };

  useEffect(() => {
    if (InfoWindow && !infoWindow) {
      setInfoWindow(new InfoWindow());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!InfoWindow, !!infoWindow]);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      map.addListener('click', handler);
      map.addListener('idle', () => {
        const newZoom = map.getZoom();
        const newCenter = map.getCenter();

        if (newZoom && newZoom !== zoom) {
          setZoom(newZoom);
        }

        if (newCenter) {
          setCenter(newCenter.toJSON());
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, map]);

  useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useDeepCompareMemoize(map), useDeepCompareMemoize(options)]);

  return { ref, map, infoWindow };
};
