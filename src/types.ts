export type ID = string;
export type DateTime = number;

export type Zoom = number;
export type Coordinate = number;

export type LatLng = {
  lat: Coordinate;
  lng: Coordinate;
};

export type Place = LatLng & {
  zoom: Zoom;
};

export type SetPlace = (mode: 'new' | 'existing', place: Place) => void;
export type SetZoom = (zoom: Zoom) => void;

export type valueof<T> = T[keyof T];

export type Category =
  | 'routes'
  | 'bridge'
  | 'cave'
  | 'christian'
  | 'fortress'
  | 'islamic'
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

type GeoJSONPoint<A, C, G> = {
  type: 'Feature';
  properties: {
    active?: A;
    category: C;
    description: string;
    name: string;
    notVerified?: true;
  };
  geometry: G;
};

export type GeoJSON = {
  type: 'FeatureCollection';
  features: GeoJSONPoint<never, never, GeoJSONPointField | GeoJSONRouteField>[];
};

export type Point = GeoJSONPoint<boolean, Category, GeoJSONPointField>;
export type Route = GeoJSONPoint<never, Category, GeoJSONRouteField>;

export type MapState = {
  points: Point[];
  routes: Route[];
  newPoint?: Point;
};

export type FiltersState = Record<
  Category,
  { checked: boolean; count: number }
>;
