import { BaseIconOptions, Icon, Point } from 'leaflet';

import { POINT_ROUTE, POINT_TEMP } from 'src/constants';
import { Coordinate, InternalCategory, Place, Zoom } from 'src/types';

export const getInitialZoom = (): Zoom => (window.innerWidth > 700 ? 9 : 8);

const convertToSexagesimal = (
  value: Coordinate,
  suffix: 'N' | 'S' | 'E' | 'W'
) => {
  const [degree, decimal] = String(value).split('.');

  const firstStep = (parseFloat('0.' + decimal) * 60).toString();
  const secondStep = parseFloat('0.' + firstStep.split('.')[1]);

  const minute = firstStep.split('.')[0];
  const second = parseFloat(String(secondStep * 60)).toFixed(2);

  return `${degree}°${minute}'${second}"${suffix}`.replace('-', '');
};

export const latLngToDMS = (lat: Coordinate, lng: Coordinate) => {
  const first = convertToSexagesimal(lat, lat > 0 ? 'N' : 'S');
  const second = convertToSexagesimal(lng, lng > 0 ? 'E' : 'W');

  return `${first}+${second}`;
};

export const createGoogleMapsURL = ({ lat, lng, zoom }: Place) => {
  const dms = latLngToDMS(lat, lng);
  const url = `https://www.google.com/maps/place/${dms}/@${lat},${lng},${zoom}z`;

  return encodeURI(url).replace(
    /[!'()*]/g,
    (c) => '%' + c.charCodeAt(0).toString(16)
  );
};

export const roundCoordinate = (value: Coordinate) =>
  Math.round(value * 1000000) / 1000000;

const iconOptions: BaseIconOptions = {
  iconSize: new Point(27, 43),
  iconAnchor: [13.5, 41],
};

export const icons = {
  blue: new Icon({ iconUrl: '/pin/blue.svg', ...iconOptions }),
  gray: new Icon({ iconUrl: '/pin/gray.svg', ...iconOptions }),
  red: new Icon({ iconUrl: '/pin/red.svg', ...iconOptions }),
  yellow: new Icon({ iconUrl: '/pin/yellow.svg', ...iconOptions }),
};

export type Icons = keyof typeof icons;

export const getIconColor = (
  category: InternalCategory,
  notVerified?: boolean
): Icons => {
  if (category === POINT_TEMP) {
    return 'gray';
  }

  if (notVerified) {
    return 'yellow';
  }

  return category === POINT_ROUTE ? 'blue' : 'red';
};
