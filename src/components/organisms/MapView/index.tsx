import React, { useState } from 'react';

import { Map } from 'src/components/molecules/Map';
import { Sidebar } from 'src/components/molecules/Sidebar';
import { Filters } from 'src/components/organisms/Filters';
import { filtersState } from 'src/constants/filters';
import { points } from 'src/data/points';
import { getWithDecline } from 'src/i18n/Decline';
import { Point } from 'src/types';

import styles from 'src/components/organisms/MapView/styles.module.css';

type Props = {
  isAdmin: boolean;
};

export const MapView: React.FC<Props> = ({ isAdmin }) => {
  const [markers, setMarkers] = useState<Point[]>(points);
  const [filters, setFilters] = useState(filtersState);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const filteredMarkers = markers.filter((m) => filters[m.type]?.checked);

  const counter = {
    from: markers.length,
    to: filteredMarkers.length,
  };

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
          ...counter,
          onClick: () => setIsSidebarVisible(!isSidebarVisible),
        }}
      />

      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        title={{ id: 'components.organisms.MapView.filters' }}
        subTitle={getWithDecline(filteredMarkers.length, [
          { id: 'components.organisms.MapView.filters.0' },
          { id: 'components.organisms.MapView.filters.1', values: counter },
          { id: 'components.organisms.MapView.filters.2', values: counter },
          { id: 'components.organisms.MapView.filters.3', values: counter },
        ])}
      >
        <Filters filters={filters} onChange={setFilters} isAdmin={isAdmin} />

        {isAdmin && (
          <pre className={styles.code}>
            {JSON.stringify(markers.filter((m) => !m.type)[0], null, 2)}
          </pre>
        )}
      </Sidebar>
    </div>
  );
};
