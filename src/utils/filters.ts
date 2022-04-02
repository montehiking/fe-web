import { POINT_EDITOR, POINT_ROUTES } from 'src/constants';
import { labels } from 'src/constants/filters';
import { Category, FiltersState, Point } from 'src/types';

const extendedCategories = Object.keys(labels) as Category[];
export const categories = extendedCategories.filter(
  (category) => category !== POINT_EDITOR
);

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
  dehydrated: Category[] = []
): FiltersState => {
  const state = extendedCategories.reduce<FiltersState>((acc, category) => {
    const checked = !dehydrated.includes(category);

    acc[category] = {
      checked: category === POINT_ROUTES ? !checked : checked,
      count: 0,
    };

    return acc;
  }, {} as FiltersState);

  points.forEach((point) => {
    const { category } = point.properties;

    if (state[category]) {
      state[category].count += 1;
    }
  });

  return state;
};

export const getCategories = (isEditor: boolean): Category[] =>
  isEditor ? extendedCategories : categories;
