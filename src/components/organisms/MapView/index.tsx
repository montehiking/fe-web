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

  const {
    counter,
    filters,
    initial,
    mapState,
    setFilters,
    setPoints,
    setZoom,
  } = useMapState(isOwner || isEditor);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  if (!filters) {
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
          ...counter,
          onClick: () => setIsSidebarVisible(!isSidebarVisible),
        }}
        initial={initial}
        onClick={setPoints}
        onZoom={setZoom}
        state={mapState}
      />

      <Sidebar
        counter={counter}
        filters={filters}
        isEditor={isEditor}
        isVisible={isSidebarVisible}
        mapState={mapState}
        onClose={() => setIsSidebarVisible(false)}
        setFilters={setFilters}
      />
    </div>
  );
};
