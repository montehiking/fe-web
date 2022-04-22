import { useLayoutEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { POINT_ROUTES, POINT_TEMP } from 'src/constants';
import { getPlace, redirect } from 'src/navigation';
import {
  Category,
  FiltersState,
  MapState,
  Point,
  SetPlace,
  SetZoom,
} from 'src/types';
import { createPoint, dehydrate, filterData, hydrate } from 'src/utils/filters';
import { getData } from 'src/utils/geoJSON';
import { getInitialZoom, roundCoordinate } from 'src/utils/maps';
import { getItem, setItem } from 'src/utils/storage';

type State = {
  filters?: FiltersState;
} & MapState;

const hiddenFilters = getItem<Category[]>('filters', []);

const initial = getPlace();

export const useMapState = (isEditor: boolean) => {
  const intl = useIntl();

  const [state, setState] = useState<State>({
    filters: undefined,
    newPoint: undefined,
    points: [],
    routes: [],
  });

  useLayoutEffect(() => {
    getData(isEditor).then(({ points, routes }) => {
      let isExist = false;
      let patchedPoints: Point[] = points;

      if (initial) {
        patchedPoints = points.map((point) => {
          if (
            point.properties.category === POINT_ROUTES ||
            !(
              point.geometry.coordinates[0] === initial.lng &&
              point.geometry.coordinates[1] === initial.lat
            )
          ) {
            return point;
          }

          isExist = true;
          point.properties.active = true;

          return point;
        });
      }

      setState({
        filters: hydrate(points, routes, hiddenFilters),
        newPoint:
          initial && !isExist ? createPoint(intl, initial, true) : undefined,
        points: patchedPoints,
        routes,
      });
    });
  }, [intl, isEditor]);

  const setFilters = (filters: FiltersState) => {
    setState({ ...state, filters });
    setItem('filters', dehydrate(filters));
  };

  const setPoints: SetPlace = (mode, { lat, lng, zoom }) => {
    const place = {
      lat: roundCoordinate(lat),
      lng: roundCoordinate(lng),
      zoom,
    };

    redirect(place);

    if (mode === 'new') {
      const newPoint: Point = createPoint(intl, place, false);

      setState((state) => {
        const points = state.points
          .filter((point) => point.properties.category !== POINT_TEMP)
          .map((point) => {
            point.properties.active = undefined;

            return point;
          });

        return { ...state, points: points, newPoint };
      });
    }
  };

  const setZoom: SetZoom = (zoom) => {
    const place = getPlace();

    if (place) {
      redirect({ ...place, zoom });
    }
  };

  const filteredPoints = filterData(state.points, state.filters);
  const filteredRoutes = filterData(state.routes, state.filters);

  return {
    counter: {
      from: state.points.length + state.routes.length,
      to: filteredPoints.length + filteredRoutes.length,
    },
    filters: state.filters,
    initial: initial || {
      lat: 42.729602,
      lng: 19.288247,
      zoom: getInitialZoom(),
    },
    mapState: {
      newPoint: state.newPoint,
      points: filteredPoints,
      routes: filteredRoutes,
    },
    setFilters,
    setPoints,
    setZoom,
  };
};
