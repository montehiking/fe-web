export type ID = string;
export type DateTime = number;

export type Zoom = number;
export type Coordinate = number;

export type valueof<T> = T[keyof T];

export type Category =
  | ''
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

type GeoJSONPoint<C> = {
  type: 'Feature';
  properties: {
    title: string;
    description: string;
    category: C;
    notVerified?: true;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
};

export type GeoJSON = {
  type: 'FeatureCollection';
  features: GeoJSONPoint<never>[];
};

export type Point = GeoJSONPoint<Category>;

export type FiltersState = Record<
  Category,
  { checked: boolean; count: number }
>;
