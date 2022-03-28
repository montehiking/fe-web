import { points } from 'src/data/points';
import { PointType } from 'src/types';

export type FiltersState = Record<
  PointType,
  { checked: boolean; count: number }
>;

export const filtersState = points.reduce<FiltersState>((acc, point) => {
  const { count } = acc[point.type] ?? { count: 0 };
  acc[point.type] = { checked: true, count: count + 1 };

  return acc;
}, {} as never);
