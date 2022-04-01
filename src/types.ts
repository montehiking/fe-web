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
  description: string;
  notVerified?: boolean;
  title: string;
  type: PointType;
};

export type FiltersState = Partial<
  Record<PointType, { checked: boolean; count: number }>
>;

export type DehydratedFiltersState = Partial<Record<PointType, boolean>>;
