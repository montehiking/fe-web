import { POINT_ROUTES } from 'src/constants';
import { Category, GeoJSON, Point, Route } from 'src/types';
import { categories } from 'src/utils/filters';

type GeoData = Point | Route;

const parseData = (
  collection: GeoJSON,
  category: Category,
  isEditor: boolean
): GeoData[] =>
  collection.features
    .filter(({ properties }) => !properties.notVerified || isEditor)
    .map(
      (item) =>
        ({ ...item, properties: { ...item.properties, category } } as GeoData)
    );

const fetchData = async (
  category: Category,
  isEditor: boolean
): Promise<GeoData[]> => {
  try {
    const path =
      category === POINT_ROUTES
        ? '/data/routes.geojson'
        : `/data/points/${category}.geojson`;

    const data = await fetch(path);
    const collection: GeoJSON = await data.json();

    return parseData(collection, category, isEditor);
  } catch (e) {
    return [];
  }
};

export const getData = async (
  isEditor: boolean
): Promise<{ points: Point[]; routes: Route[] }> => {
  const collections = await Promise.all(
    categories.map((category) => fetchData(category, isEditor))
  );

  const points: Point[] = [];
  const routes: Route[] = [];

  collections.forEach((collection) => {
    if (collection[0]?.properties.category === POINT_ROUTES) {
      routes.push(...(collection as Route[]));
    } else {
      points.push(...(collection as Point[]));
    }
  });

  return { points, routes };
};
