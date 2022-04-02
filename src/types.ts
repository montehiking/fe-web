export type ID = string;
export type DateTime = number;

export type Zoom = number;
export type Coordinate = number;

export type valueof<T> = T[keyof T];

export type Category =
  | ''
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

export type GeoJSONPoint = {
  type: 'Feature';
  properties: {
    title: string;
    description: string;
    notVerified?: true;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
};

export type GeoJSON = {
  type: 'FeatureCollection';
  features: GeoJSONPoint[];
};

export type Point = google.maps.LatLngLiteral & {
  description: string;
  notVerified?: boolean;
  title: string;
  type: Category;
};

export type FiltersState = Partial<
  Record<Category, { checked: boolean; count: number }>
>;
