import { useLayoutEffect, useState } from 'react';

import { Category, FiltersState, Point } from 'src/types';
import { dehydrate, hydrate } from 'src/utils/filters';
import { getPoints } from 'src/utils/points';
import { getItem, setItem } from 'src/utils/storage';

type State = {
  filters?: FiltersState;
  points: Point[];
};

const hiddenFilters = getItem<Category[]>('filters', []);

export const usePoints = (isEditor: boolean) => {
  const [state, setState] = useState<State>({
    filters: undefined,
    points: [],
  });

  useLayoutEffect(() => {
    getPoints(isEditor).then((points) => {
      setState({
        filters: hydrate(points, hiddenFilters),
        points,
      });
    });
  }, [isEditor]);

  const setPoints = ({ latLng }: google.maps.MapMouseEvent) => {
    if (latLng && isEditor) {
      const { lat, lng } = latLng.toJSON();

      const newPoint: Point = {
        type: 'Feature',
        properties: {
          title: '',
          description: '',
          category: '',
          notVerified: true,
        },
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
      };

      setState((state) => ({
        filters: state.filters,
        points: [newPoint, ...state.points],
      }));
    }
  };

  const setFilters = (filtersState: FiltersState) => {
    setState({
      filters: filtersState,
      points: state.points,
    });

    setItem('filters', dehydrate(filtersState));
  };

  return { ...state, setPoints, setFilters };
};
