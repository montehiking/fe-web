import { POINT_ROUTES, POINT_TEMP } from 'src/constants';
import { labels } from 'src/constants/filters';
import {
  Category,
  FiltersState,
  LatLng,
  Place,
  Point,
  PointState,
  Route,
  Zoom,
} from 'src/types';

export const categories = Object.keys(labels) as Category[];

export const dehydrate = (state: FiltersState): Category[] => {
  const categories = Object.keys(state || {}) as Category[];

  return categories.reduce<Category[]>((acc, category) => {
    if (state[category]?.checked === (category === POINT_ROUTES)) {
      acc.push(category);
    }

    return acc;
  }, []);
};

export const hydrate = (
  points: Point[],
  routes: Route[],
  dehydrated: Category[] = []
): FiltersState => {
  const state = categories.reduce<FiltersState>((acc, category) => {
    const checked = !dehydrated.includes(category);

    acc[category] = {
      checked: category === POINT_ROUTES ? !checked : checked,
      count: 0,
    };

    return acc;
  }, {} as FiltersState);

  [...points, ...routes].forEach((point) => {
    const { category } = point.properties;

    if (category in state) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state as any)[category].count += 1;
    }
  });

  return state;
};

// TODO: add tests
export const filterData = <T extends Point | Route>(
  data: T[],
  filters?: FiltersState
): T[] =>
  filters
    ? data.filter(
        (m) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (filters as any)[m.properties.category]?.checked ??
          m.properties.category === POINT_TEMP
      )
    : [];

export const prepareTempPoint = (point?: Point) => {
  if (!point) {
    return '';
  }

  const serialized = {
    ...point,
    properties: {
      ...point.properties,
      active: undefined,
      category: undefined,
      description: '',
      name: '',
    },
  };

  return JSON.stringify(serialized, null, 2);
};

export const createPoint = ({
  latLng,
  ...properties
}: { latLng: LatLng } & Point['properties']): Point => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [latLng.lng, latLng.lat],
  },
  properties,
});

const findPoint = (points: Point[], place: Place): Point | undefined =>
  points.find(
    ({ geometry }) =>
      geometry.coordinates[0] === place.lng &&
      geometry.coordinates[1] === place.lat
  );

export const calcPointState = (
  zoom: Zoom,
  points: Point[],
  routesPoints: Point[],
  place?: Place
): PointState => {
  if (!place) {
    return { zoom, isVisible: false };
  }

  const current = findPoint(points, place) || findPoint(routesPoints, place);

  return current
    ? { zoom, isVisible: true, current }
    : { zoom, isVisible: false };
};
