export type ID = string;
export type DateTime = number;

export type Zoom = number;
export type Coordinate = number;

export type valueof<T> = T[keyof T];

export type Category =
  | 'routes'
  | 'bridge'
  | 'cave'
  | 'christian'
  | 'fortress'
  | 'lighthouse'
  | 'monument'
  | 'nature'
  | 'old_town'
  | 'other'
  | 'palace'
  | 'waterfall';

type GeoJSONPointField = {
  type: 'Point';
  coordinates: [number, number];
};

type GeoJSONRouteField = {
  type: 'LineString';
  coordinates: [number, number][];
};

type GeoJSONPoint<C, G> = {
  type: 'Feature';
  properties: {
    title: string;
    description: string;
    category: C;
    notVerified?: true;
  };
  geometry: G;
};

export type GeoJSON = {
  type: 'FeatureCollection';
  features: GeoJSONPoint<never, GeoJSONPointField | GeoJSONRouteField>[];
};

export type Point = GeoJSONPoint<Category, GeoJSONPointField>;
export type Route = GeoJSONPoint<Category, GeoJSONRouteField>;

export type MapState = {
  points: Point[];
  routes: Route[];
};

export type FiltersState = Record<
  Category,
  { checked: boolean; count: number }
>;
