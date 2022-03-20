import { Coordinate, Zoom } from 'src/types';

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

export const createGoogleMapsURL = (
  lat: Coordinate,
  lng: Coordinate,
  zoom: Zoom
) => {
  const dms = latLngToDMS(lat, lng);
  const url = `https://www.google.com/maps/place/${dms}/@${lat}${lng},${zoom}z`;

  return encodeURI(url).replace(
    /[!'()*]/g,
    (c) => '%' + c.charCodeAt(0).toString(16)
  );
};
