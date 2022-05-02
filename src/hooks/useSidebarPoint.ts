import { useLayoutEffect, useState } from 'react';

import { getPlace, history } from 'src/navigation';
import { Place, Point } from 'src/types';

type Places = {
  prevPlace?: Place;
  currentPlace?: Place;
  isVisible: boolean;
};

const findPoint = (points: Point[], place?: Place) => {
  if (!place) {
    return undefined;
  }

  return points.find(
    ({ geometry }) =>
      geometry.coordinates[0] === place.lng &&
      geometry.coordinates[1] === place.lat
  );
};

export const useSidebarPoint = (points: Point[]) => {
  const initialPlace = getPlace();

  const [{ prevPlace, currentPlace, isVisible }, setState] = useState<Places>({
    prevPlace: initialPlace,
    currentPlace: initialPlace,
    isVisible: !!initialPlace,
  });

  useLayoutEffect(() => {
    const unlisten = history.listen(({ location }) => {
      setState((state) => {
        const { currentPlace } = state;
        const nextPlace = getPlace(location);

        if (JSON.stringify(currentPlace) === JSON.stringify(nextPlace)) {
          return state;
        }

        if (
          currentPlace?.lat === nextPlace?.lat &&
          currentPlace?.lng === nextPlace?.lng
        ) {
          return { ...state, zoom: nextPlace?.zoom };
        }

        return {
          prevPlace: currentPlace,
          currentPlace: nextPlace,
          isVisible: true,
        };
      });
    });

    return unlisten;
  }, []);

  const point = findPoint(points, currentPlace);
  const prevPoint = findPoint(points, prevPlace);

  return {
    isVisible: !!(point && isVisible),
    onClose: () => setState((state) => ({ ...state, isVisible: false })),
    point: point || prevPoint,
    zoom: point ? currentPlace?.zoom : prevPlace?.zoom,
  };
};
