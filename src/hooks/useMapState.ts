import { useLayoutEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { POINT_ROUTES, POINT_TEMP } from 'src/constants';
import { getPlace, redirect } from 'src/navigation';
import {
  Category,
  FiltersState,
  MapState,
  Point,
  SetFilters,
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
      let newPoint: Point | undefined = undefined;

      if (initial) {
        let isExist = false;

        points.forEach((point) => {
          if (
            point.properties.category !== POINT_ROUTES &&
            point.geometry.coordinates[0] === initial.lng &&
            point.geometry.coordinates[1] === initial.lat
          ) {
            isExist = true;
            point.properties.active = true;
          }
        });

        if (!isExist) {
          newPoint = createPoint(intl, initial, true);
        }
      }

      setState({
        filters: hydrate(points, routes, hiddenFilters),
        newPoint,
        points,
        routes,
      });
    });
  }, [intl, isEditor]);

  const setFilters: SetFilters = (filters) => {
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
            if (!point.properties.active) {
              return point;
            }

            point.properties.active = undefined;

            return {
              ...point,
              properties: { ...point.properties, active: undefined },
            };
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
    actions: {
      setFilters,
      setPoints,
      setZoom,
    },
    filters: {
      counter: {
        from: state.points.length + state.routes.length,
        to: filteredPoints.length + filteredRoutes.length,
      },
      state: state.filters,
    },
    map: {
      initial: initial || {
        lat: 42.729602,
        lng: 19.288247,
        zoom: getInitialZoom(),
      },
      state: {
        newPoint: state.newPoint,
        points: filteredPoints,
        routes: filteredRoutes,
      } as MapState,
    },
  };
};
