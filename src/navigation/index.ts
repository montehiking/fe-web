import { createBrowserHistory } from 'history';
import { useLayoutEffect, useState } from 'react';

import { Place } from 'src/types';

const history = createBrowserHistory();

export const redirect = ({ lat, lng, zoom }: Place): void => {
  const { search } = history.location;

  history.replace(`/place/@${lat},${lng},${zoom}z${search}`, {});
};

export const usePlace = (): Place | undefined => {
  const [place, setPlace] = useState<Place>();

  useLayoutEffect(() => {
    const unlisten = history.listen((ll) => {
      console.log({
        setPlace,
        ll,
      });
    });

    return unlisten;
  }, []);

  return place;
};
