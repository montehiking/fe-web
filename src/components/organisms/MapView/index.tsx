import React, { useState } from 'react';

import { Map } from 'src/components/molecules/Map';
import { Sidebar } from 'src/components/molecules/Sidebar';
import { Filters } from 'src/components/organisms/Filters';
import { filtersState, points as originalPoints } from 'src/data/points';
import { getWithDecline } from 'src/i18n/Decline';
import { Point } from 'src/types';

import styles from 'src/components/organisms/MapView/styles.module.css';

type Props = {
  isAdmin: boolean;
};

export const MapView: React.FC<Props> = ({ isAdmin }) => {
  const [points, setPoints] = useState<Point[]>(originalPoints);
  const [filters, setFilters] = useState(filtersState);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const filteredPoints = points.filter((m) => filters[m.type]?.checked);

  const counter = {
    from: points.length,
    to: filteredPoints.length,
  };

  const onClick = ({ latLng }: google.maps.MapMouseEvent) => {
    if (latLng && isAdmin) {
      const newPoint: Point = {
        ...latLng.toJSON(),
        type: '',
        title: '',
        description: '',
      };

      setPoints([...points, newPoint]);
    }
  };

  return (
    <div className={styles.wrapper} data-testid="page">
      <Map
        onClick={onClick}
        points={filteredPoints}
        draggable={isAdmin}
        filter={{
          ...counter,
          onClick: () => setIsSidebarVisible(!isSidebarVisible),
        }}
      />

      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        title={{ id: 'components.organisms.MapView.filters' }}
        subTitle={getWithDecline(filteredPoints.length, [
          { id: 'components.organisms.MapView.filters.0' },
          { id: 'components.organisms.MapView.filters.1', values: counter },
          { id: 'components.organisms.MapView.filters.2', values: counter },
          { id: 'components.organisms.MapView.filters.3', values: counter },
        ])}
      >
        <Filters filters={filters} onChange={setFilters} isAdmin={isAdmin} />

        {isAdmin && (
          <pre className={styles.code}>
            {JSON.stringify(points.filter((m) => !m.type)[0], null, 2)}
          </pre>
        )}
      </Sidebar>
    </div>
  );
};
