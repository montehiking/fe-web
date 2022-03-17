import React, { Children, cloneElement, isValidElement } from 'react';

import { Props, useMap } from 'src/hooks/useMap';

import styles from 'src/components/atoms/Map/styles.module.css';

export const Map: React.FC<Props> = ({ children, ...options }) => {
  const { ref, map } = useMap(options);

  return (
    <>
      <div ref={ref} className={styles.map} />

      {Children.map(
        children,
        (child) => isValidElement(child) && cloneElement(child, { map })
      )}
    </>
  );
};
