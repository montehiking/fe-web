import { Location, createBrowserHistory } from 'history';

import { Place } from 'src/types';

export const history = createBrowserHistory();

export const redirect = ({ lat, lng, zoom }: Place): void => {
  const { search } = history.location;

  history.replace(`/place/@${lat},${lng},${zoom}z${search}`, {});
};

export const getMode = () => {
  const searchString = history.location.search.replace('?', '');

  return {
    isOwner: searchString === 'owner',
    isEditor: searchString === 'editor',
  };
};

export const getPlace = (
  { pathname }: Location = history.location
): Place | undefined => {
  const result = pathname
    .trim()
    .slice(8, -1)
    .split(',')
    .map((item) => parseFloat(item));

  if (
    result.length !== 3 ||
    isNaN(result[0]) ||
    isNaN(result[1]) ||
    isNaN(result[2]) ||
    result[2] > 20
  ) {
    return undefined;
  }

  return {
    lat: result[0],
    lng: result[1],
    zoom: result[2],
  };
};
