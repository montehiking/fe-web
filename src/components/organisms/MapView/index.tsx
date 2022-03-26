import React, { useState } from 'react';

import { Sidebar } from 'src/components/atoms/Sidebar';
import { Map } from 'src/components/molecules/Map';
import { Filters, filtersInitial } from 'src/components/organisms/Filters';
import { Point, points } from 'src/points';

import styles from 'src/components/organisms/MapView/styles.module.css';

type Props = {
  isAdmin: boolean;
};

export const MapView: React.FC<Props> = ({ isAdmin }) => {
  const [markers, setMarkers] = useState<Point[]>(points);
  const [filters, setFilters] = useState(filtersInitial);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const filteredMarkers = markers.filter((m) => filters[m.type]);

  const onClick = ({ latLng }: google.maps.MapMouseEvent) => {
    if (latLng && isAdmin) {
      setMarkers([
        ...markers,
        { ...latLng.toJSON(), type: '', title: '', description: '' },
      ]);
    }
  };

  return (
    <div className={styles.wrapper} data-testid="page">
      <Map
        onClick={onClick}
        markers={filteredMarkers}
        draggable={isAdmin}
        filter={{
          from: markers.length,
          to: filteredMarkers.length,
          onClick: () => setIsSidebarVisible(!isSidebarVisible),
        }}
      />

      {isSidebarVisible && (
        <Sidebar>
          <Filters filters={filters} onChange={setFilters} />

          {isAdmin && (
            <pre className={styles.code}>
              {JSON.stringify(
                markers.filter((m) => !m.type),
                null,
                2
              )}
            </pre>
          )}
        </Sidebar>
      )}
    </div>
  );
};
