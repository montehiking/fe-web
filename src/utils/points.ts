import { POINT_ROUTES } from 'src/constants';
import { Category, GeoJSON, Point } from 'src/types';
import { categories } from 'src/utils/filters';

const parsePoints = (
  collection: GeoJSON,
  category: Category,
  isEditor: boolean
): Point[] =>
  collection.features
    .filter(({ properties }) => !properties.notVerified || isEditor)
    .map((point) => ({
      ...point,
      properties: { ...point.properties, category },
    }));

const fetchPoints = async (
  category: Category,
  isEditor: boolean
): Promise<Point[]> => {
  try {
    const path =
      category === POINT_ROUTES
        ? '/data/routes.geojson'
        : `/data/points/${category}.geojson`;

    const data = await fetch(path);
    const collection: GeoJSON = await data.json();

    return parsePoints(collection, category, isEditor);
  } catch (e) {
    return [];
  }
};

export const getPoints = async (isEditor: boolean): Promise<Point[]> => {
  const collections = await Promise.all(
    categories.map((category) => fetchPoints(category, isEditor))
  );

  return collections.reduce<Point[]>((acc, collection) => {
    acc.push(...collection);
    return acc;
  }, []);
};
