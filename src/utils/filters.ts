import { POINT_ROUTES } from 'src/constants';
import { labels } from 'src/constants/filters';
import { Category, FiltersState, Point, Route } from 'src/types';

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

    if (state[category]) {
      state[category].count += 1;
    }
  });

  return state;
};

export const filterData = <T extends Point | Route>(
  data: T[],
  filters?: FiltersState
): T[] =>
  filters
    ? data.filter(
        (m) =>
          filters[m.properties.category]?.checked ??
          (m.properties.category as never) === ''
      )
    : [];
