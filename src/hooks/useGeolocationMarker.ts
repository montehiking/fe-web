import { useLayoutEffect, useMemo, useState } from 'react';

import { Coordinate } from 'src/types';

type Props = {
  enabled: null | boolean;
  map?: google.maps.Map;
};

type Coordinates = { lat?: Coordinate; lng?: Coordinate };

export const useGeolocationMarker = ({ enabled, map }: Props) => {
  const [position, setPosition] = useState<Coordinates>({});
  const marker = useMemo(
    () =>
      new google.maps.Marker({
        cursor: 'default',
        icon: '/dot/blue.svg',
        optimized: true,
        zIndex: google.maps.Marker.MAX_ZINDEX,
      }),
    []
  );

  useLayoutEffect(() => {
    let watchId: number | undefined = undefined;

    if (enabled && navigator.geolocation) {
      const handlePosition = (position: GeolocationPosition) => {
        const { latitude: lat, longitude: lng } = position.coords;

        if (lat && lng) {
          setPosition((prev) =>
            prev.lat === lat && prev.lng === lng ? prev : { lat, lng }
          );
        }
      };

      watchId = navigator.geolocation.watchPosition(
        handlePosition,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000,
        }
      );
    }

    return () => {
      if (watchId !== undefined && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }

      if (enabled) {
        marker.setMap(null);
      }
    };
  }, [enabled, marker]);

  useLayoutEffect(() => {
    const { lat, lng } = position;

    if (lat && lng) {
      marker.setOptions({ map, position: { lat, lng } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);
};
