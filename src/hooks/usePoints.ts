import { useLayoutEffect, useState } from 'react';

import { DehydratedFiltersState, FiltersState, Point } from 'src/types';
import { dehydrate, filterPoints, hydrate } from 'src/utils/filters';
import { getItem, setItem } from 'src/utils/storage';

type State = {
  filters: FiltersState;
  points: Point[];
};

const hiddenFilters = getItem<DehydratedFiltersState>('filters', []);

export const usePoints = (isAdmin: boolean) => {
  const [state, setState] = useState<State>({
    filters: {},
    points: [],
  });

  useLayoutEffect(() => {
    import('src/data/points').then(({ points }) => {
      setState({
        filters: hydrate(points, hiddenFilters, isAdmin),
        points: filterPoints(points, isAdmin),
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
