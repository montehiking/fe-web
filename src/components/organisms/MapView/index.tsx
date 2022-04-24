import classNames from 'classnames';
import React, { useState } from 'react';

import { Spin } from 'src/components/atoms/Spin';
import { Map } from 'src/components/molecules/Map';
import { Sidebar } from 'src/components/organisms/Sidebar';
import { useMapState } from 'src/hooks/useMapState';

import styles from 'src/components/organisms/MapView/styles.module.css';

export const MapView: React.FC = () => {
  const searchString = window.location.search.replace('?', '');

  const isOwner = searchString === 'owner';
  const isEditor = searchString === 'editor';

  const { actions, filters, map } = useMapState(isOwner || isEditor);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
        state={map.state}
      />

      <Sidebar
        counter={filters.counter}
        filters={filters.state}
        isEditor={isEditor}
        isVisible={isSidebarVisible}
        mapState={map.state}
        onClose={() => setIsSidebarVisible(false)}
        setFilters={actions.setFilters}
      />
    </div>
  );
};
