import classNames from 'classnames';
import React, { useLayoutEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

import styles from 'src/components/atoms/MapGeolocationButton/styles.module.css';

export const MapGeolocationButton: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const map = useMap();

  useLayoutEffect(() => {
    if (enabled) {
      map?.locate();
    }

    return () => {
      map?.stopLocate();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!map, enabled]);

  return (
    <>
      <button
        className={classNames(styles.button, {
          [styles.active]: enabled,
        })}
        onClick={() => setEnabled(!enabled)}
        type="button"
      >
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
          <path d="M13 2.05V0h-2v2.05A10.003 10.003 0 0 0 2.05 11H0v2h2.05A10.003 10.003 0 0 0 11 21.95V24h2v-2.05A10.003 10.003 0 0 0 21.95 13H24v-2h-2.05A10.003 10.003 0 0 0 13 2.05ZM20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
        </svg>
      </button>
    </>
  );
};
