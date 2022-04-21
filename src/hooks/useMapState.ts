import { useLayoutEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { POINT_TEMP } from 'src/constants';
import { msg } from 'src/i18n/Msg';
import { redirect } from 'src/navigation';
import { Category, FiltersState, MapState, Point, SetPlace } from 'src/types';
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

export const useMapState = (isEditor: boolean) => {
  const intl = useIntl();

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

  const setPoints: SetPlace = (mode, { lat, lng, zoom }) => {
    const place = {
      lat: roundCoordinate(lat),
      lng: roundCoordinate(lng),
      zoom,
    };

    redirect(place);

    if (mode === 'new') {
      const newPoint: Point = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [place.lng, place.lat],
        },
        properties: {
          name: msg(intl, { id: 'hooks.useMapState.newPoint.name' }),
          description: msg(intl, {
            id: 'hooks.useMapState.newPoint.description',
          }),
          category: POINT_TEMP,
          notVerified: true,
        },
      } as never;

      setState((state) => {
        const points = state.points.filter(
          (point) => point.properties.category !== POINT_TEMP
        );

        return { ...state, points: [newPoint, ...points] };
      });
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
