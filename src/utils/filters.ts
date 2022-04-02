import { labels } from 'src/constants/filters';
import { Category, FiltersState, Point } from 'src/types';

export const dehydrate = (state: FiltersState): Category[] => {
  const categories = Object.keys(state || {}) as Category[];

  return categories.reduce<Category[]>((acc, item) => {
    if (state[item]?.checked === false) {
      acc.push(item);
    }

    return acc;
  }, []);
};

export const hydrate = (
  points: Point[],
  dehydrated: Category[] = []
): FiltersState =>
  points.reduce<FiltersState>((acc, point) => {
    const { count, checked } = acc[point.type] ?? {
      count: 0,
      checked: !dehydrated.includes(point.type),
    };
    acc[point.type] = { checked, count: count + 1 };

    return acc;
  }, {});

const adminCategories = Object.keys(labels) as Category[];
export const categories = adminCategories.filter((category) => category !== '');

export const getCategories = (isAdmin: boolean): Category[] =>
  isAdmin ? adminCategories : categories;
