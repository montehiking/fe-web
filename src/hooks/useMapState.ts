import { useLayoutEffect, useState } from 'react';

import { Category, FiltersState, MapState, Point } from 'src/types';
import { dehydrate, filterData, hydrate } from 'src/utils/filters';
import { getData } from 'src/utils/geoJSON';
import { getItem, setItem } from 'src/utils/storage';

type State = {
  filters?: FiltersState;
} & MapState;

const hiddenFilters = getItem<Category[]>('filters', []);

export const useMapState = (isEditor: boolean) => {
  const [state, setState] = useState<State>({
    filters: undefined,
    points: [],
    routes: [],
  });

  useLayoutEffect(() => {
    getData(isEditor).then(({ points, routes }) => {
      setState({
        filters: hydrate(points, routes, hiddenFilters),
        points,
        routes,
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

      setState((state) => ({ ...state, points: [newPoint, ...state.points] }));
    }
  };

  const setFilters = (filters: FiltersState) => {
    setState({ ...state, filters });
    setItem('filters', dehydrate(filters));
  };

  const filteredPoints = filterData(state.points, state.filters);
  const filteredRoutes = filterData(state.routes, state.filters);

  return {
    added: JSON.stringify(state.points.filter((m) => !m.type)[0], null, 2),
    filters: state.filters,
    mapState: {
      points: filteredPoints,
      routes: filteredRoutes,
    },
    counter: {
      from: state.points.length + state.routes.length,
      to: filteredPoints.length + filteredRoutes.length,
    },
    setPoints,
    setFilters,
  };
};
