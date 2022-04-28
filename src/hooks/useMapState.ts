import { useLayoutEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { POINT_ROUTE, POINT_TEMP } from 'src/constants';
import { msg } from 'src/i18n/Msg';
import { getPlace, redirect } from 'src/navigation';
import {
  Category,
  FiltersState,
  LatLng,
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

  const newPointParams = {
    name: msg(intl, { id: 'hooks.useMapState.newPoint.name' }),
    description: msg(intl, {
      id: 'hooks.useMapState.newPoint.description',
    }),
    category: POINT_TEMP,
    notVerified: true,
  } as const;

  const [state, setState] = useState<State>({
    filters: undefined,
    newPoint: undefined,
    points: [],
    routes: [],
    routesPoints: [],
  });

  useLayoutEffect(() => {
    getData(isEditor).then(({ points, routes }) => {
      let newPoint: Point | undefined = undefined;
      let isExist = false;

      if (initial) {
        points.forEach((point) => {
          if (
            point.geometry.coordinates[0] === initial.lng &&
            point.geometry.coordinates[1] === initial.lat
          ) {
            isExist = true;
            point.properties.active = true;
          }
        });
      }

      const routesPoints = routes.reduce<Point[]>((acc, route) => {
        const { coordinates } = route.geometry;
        const { name, description, notVerified } = route.properties;

        const left: LatLng = {
          lat: coordinates[0][1],
          lng: coordinates[0][0],
        };

        const right: LatLng = {
          lat: coordinates[coordinates.length - 1][1],
          lng: coordinates[coordinates.length - 1][0],
        };

        const lsLeftActive =
          left.lat === initial?.lat && left.lng === initial.lng;
        const isRightActive =
          right.lat === initial?.lat && right.lng === initial.lng;

        if (lsLeftActive || isRightActive) {
          isExist = true;
        }

        const properties = {
          name,
          description,
          notVerified,
          category: POINT_ROUTE,
        } as const;

        acc.push(
          createPoint({ ...properties, latLng: left, active: lsLeftActive }),
          createPoint({ ...properties, latLng: right, active: isRightActive })
        );

        return acc;
      }, []);

      if (!isExist && initial) {
        newPoint = createPoint({
          ...newPointParams,
          active: true,
          latLng: initial,
        });
      }

      setState({
        filters: hydrate(points, routes, hiddenFilters),
        newPoint,
        points,
        routes,
        routesPoints,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const newPoint = createPoint({
        ...newPointParams,
        active: false,
        latLng: place,
      });

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
        routesPoints: state.routesPoints,
      } as MapState,
    },
  };
};
