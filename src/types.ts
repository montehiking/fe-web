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

export type SetFilters = (filters: FiltersState) => void;
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

export type InternalCategory = Category | 'routePoint' | '';

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

export type Point = GeoJSONPoint<
  boolean,
  Exclude<InternalCategory, 'routes'>,
  GeoJSONPointField
>;
export type Route = GeoJSONPoint<never, 'routes', GeoJSONRouteField>;

export type MapData = {
  points: Point[];
  routes: Route[];
};

export type MapState = MapData & {
  newPoint?: Point;
  routesPoints: Point[];
};

export type FiltersState = Record<
  Category,
  { checked: boolean; count: number }
>;

export type PointState = {
  current?: Point;
  isVisible: boolean;
  zoom: Zoom;
};
