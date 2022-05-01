import classNames from 'classnames';
import React, { useState } from 'react';

import { Spin } from 'src/components/atoms/Spin';
import { Map } from 'src/components/molecules/Map';
import { SidebarFilters } from 'src/components/organisms/SidebarFilters';
import { SidebarPoint } from 'src/components/organisms/SidebarPoint';
import { useMapState } from 'src/hooks/useMapState';
import { getMode } from 'src/navigation';

import styles from 'src/components/organisms/MapView/styles.module.css';

export const MapView: React.FC = () => {
  const { isOwner, isEditor } = getMode();

  const { actions, filters, map } = useMapState(isOwner || isEditor);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const points = [...map.state.points, ...map.state.routesPoints];

  if (!filters.state) {
    return (
      <div className={styles.wrapper} data-testid="page">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.wrapper, { 'editor-mode': isEditor })}
      data-testid="page"
    >
      <Map
        filter={{
          ...filters.counter,
          onClick: () => setIsSidebarVisible(!isSidebarVisible),
        }}
        initial={map.initial}
        onClick={actions.setPoints}
        onZoom={actions.setZoom}
        points={map.state.newPoint ? [...points, map.state.newPoint] : points}
        routes={map.state.routes}
      />

      <SidebarFilters
        counter={filters.counter}
        filters={filters.state}
        isEditor={isEditor}
        isVisible={isSidebarVisible}
        mapState={map.state}
        onClose={() => setIsSidebarVisible(false)}
        setFilters={actions.setFilters}
      />

      <SidebarPoint
        allFiltredPoints={[...map.state.points, ...map.state.routesPoints]}
      />
    </div>
  );
};
