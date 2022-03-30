export type ID = string;
export type DateTime = number;

export type Zoom = number;
export type Coordinate = number;

export type valueof<T> = T[keyof T];

export type PointType =
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

export type Point = google.maps.LatLngLiteral & {
  type: PointType;
  title: string;
  description: string;
};

export type FiltersState = Partial<
  Record<PointType, { checked: boolean; count: number }>
>;
