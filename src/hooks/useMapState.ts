import { useLayoutEffect, useState } from 'react';

import { Category, FiltersState, LatLng, MapState, Point } from 'src/types';
import {
  dehydrate,
  filterData,
  hydrate,
  prepareLastPoint,
} from 'src/utils/filters';
import { getData } from 'src/utils/geoJSON';
import { roundCoordinate } from 'src/utils/maps';
import { getItem, setItem } from 'src/utils/storage';

type State = {
  filters?: FiltersState;
} & MapState;

const hiddenFilters = getItem<Category[]>('filters', []);

export const useMapState = (isOwner: boolean, isEditor: boolean) => {
  const [state, setState] = useState<State>({
    filters: undefined,
    points: [],
    routes: [],
  });

  useLayoutEffect(() => {
    getData(isOwner || isEditor).then(({ points, routes }) => {
      setState({
        filters: hydrate(points, routes, hiddenFilters),
        points,
        routes,
      });
    });
  }, [isOwner, isEditor]);

  const setPoints = ({ lat, lng }: LatLng) => {
    if (isEditor) {
      const newPoint: Point = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [roundCoordinate(lng), roundCoordinate(lat)],
        },
        properties: {
          name: '',
          description: '',
          category: '',
          notVerified: true,
        },
      } as never;

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
    added: prepareLastPoint(state.points),
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
