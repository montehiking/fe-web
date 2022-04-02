import { Category, GeoJSON, Point } from 'src/types';
import { categories } from 'src/utils/filters';

const parsePoints = (
  collection: GeoJSON,
  category: Category,
  isAdmin: boolean
): Point[] =>
  collection.features
    .filter(({ properties }) => !properties.notVerified || isAdmin)
    .map((point) => ({
      ...point,
      properties: { ...point.properties, category },
    }));

const fetchPoints = async (
  category: Category,
  isAdmin: boolean
): Promise<Point[]> => {
  try {
    const data = await fetch(`/data/points/${category}.geojson`);
    const collection: GeoJSON = await data.json();

    return parsePoints(collection, category, isAdmin);
  } catch (e) {
    return [];
  }
};

export const getPoints = async (isAdmin: boolean): Promise<Point[]> => {
  const collections = await Promise.all(
    categories.map((category) => fetchPoints(category, isAdmin))
  );

  return collections.reduce<Point[]>((acc, collection) => {
    acc.push(...collection);
    return acc;
  }, []);
};
