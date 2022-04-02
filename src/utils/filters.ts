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
    const { category } = point.properties;
    const { count, checked } = acc[category] ?? {
      count: 0,
      checked: !dehydrated.includes(category),
    };

    acc[category] = { checked, count: count + 1 };

    return acc;
  }, {});

const extendedCategories = Object.keys(labels) as Category[];
export const categories = extendedCategories.filter(
  (category) => category !== ''
);

export const getCategories = (isEditor: boolean): Category[] =>
  isEditor ? extendedCategories : categories;
