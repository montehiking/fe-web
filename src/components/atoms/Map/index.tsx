import React, { Children, cloneElement, isValidElement } from 'react';

import { InfoWindowContext } from 'src/contexts/InfoWindowContext';
import { Props, useMap } from 'src/hooks/useMap';

import styles from 'src/components/atoms/Map/styles.module.css';

export const Map: React.FC<Props> = ({ children, ...options }) => {
  const { ref, map, zoom, infoWindow } = useMap(options);

  return (
    <InfoWindowContext.Provider value={{ infoWindow, zoom }}>
      <div ref={ref} className={styles.map} />

      {Children.map(
        children,
        (child) => isValidElement(child) && cloneElement(child, { map })
      )}
    </InfoWindowContext.Provider>
  );
};
