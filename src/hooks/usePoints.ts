import { useLayoutEffect, useState } from 'react';

import { Category, FiltersState, Point } from 'src/types';
import { dehydrate, hydrate } from 'src/utils/filters';
import { getPoints } from 'src/utils/points';
import { getItem, setItem } from 'src/utils/storage';

type State = {
  filters: FiltersState;
  points: Point[];
};

const hiddenFilters = getItem<Category[]>('filters', []);

export const usePoints = (isAdmin: boolean) => {
  const [state, setState] = useState<State>({
    filters: {},
    points: [],
  });

  useLayoutEffect(() => {
    getPoints(isAdmin).then((points) => {
      setState({
        filters: hydrate(points, hiddenFilters),
        points,
      });
    });
  }, [isAdmin]);

  const setPoints = ({ latLng }: google.maps.MapMouseEvent) => {
    if (latLng && isAdmin) {
      const newPoint: Point = {
        ...latLng.toJSON(),
        type: '',
        title: '',
        description: '',
        notVerified: true,
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
