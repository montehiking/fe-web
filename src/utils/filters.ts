import {
  DehydratedFiltersState,
  FiltersState,
  Point,
  PointType,
} from 'src/types';

export const isPointAllowed = (point: Point, isAdmin: boolean) =>
  (!point.notVerified && point.type !== '') || isAdmin;

export const dehydrate = (state: FiltersState): DehydratedFiltersState => {
  const pointTypes = Object.keys(state || {}) as PointType[];

  return pointTypes.reduce<DehydratedFiltersState>((acc, item) => {
    acc[item] = state[item]?.checked;

    return acc;
  }, {});
};

export const hydrate = (
  points: Point[],
  dehydrated: DehydratedFiltersState = {},
  isAdmin: boolean
): FiltersState =>
  points.reduce<FiltersState>((acc, point) => {
    if (isPointAllowed(point, isAdmin)) {
      const { count, checked } = acc[point.type] ?? {
        count: 0,
        checked: dehydrated[point.type] ?? true,
      };
      acc[point.type] = { checked, count: count + 1 };
    }

    return acc;
  }, {});

export const filterPoints = (points: Point[], isAdmin: boolean) =>
  points.filter((point) => isPointAllowed(point, isAdmin));
