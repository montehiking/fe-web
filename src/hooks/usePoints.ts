import { useLayoutEffect, useState } from 'react';

import { FiltersState, Point } from 'src/types';
import { getItem, setItem } from 'src/utils/storage';

type State = {
  filters: FiltersState;
  points: Point[];
};

const enabledFilters = getItem<Partial<FiltersState>>('filters');

export const usePoints = (isAdmin: boolean) => {
  const [state, setState] = useState<State>({
    filters: {},
    points: [],
  });

  useLayoutEffect(() => {
    import('src/data/points').then(({ points }) => {
      setState({
        filters: points.reduce<FiltersState>((acc, point) => {
          const { count, checked } = acc[point.type] ?? {
            count: 0,
            checked: enabledFilters[point.type]?.checked ?? true,
          };
          acc[point.type] = { checked, count: count + 1 };

          return acc;
        }, {} as never),
        points,
      });
    });
  }, []);

  const setPoints = ({ latLng }: google.maps.MapMouseEvent) => {
    if (latLng && isAdmin) {
      const newPoint: Point = {
        ...latLng.toJSON(),
        description: '',
        title: '',
        type: '',
      };

      setState({
        filters: state.filters,
        points: [...state.points, newPoint],
      });
    }
  };

  const setFilters = (filtersState: FiltersState) => {
    setState({
      filters: filtersState,
      points: state.points,
    });

    setItem('filters', state);
  };

  return { ...state, setPoints, setFilters };
};
