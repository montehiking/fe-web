import classNames from 'classnames';
import React, { useState } from 'react';

import { Spin } from 'src/components/atoms/Spin';
import { Map } from 'src/components/molecules/Map';
import { Sidebar } from 'src/components/molecules/Sidebar';
import { Filters } from 'src/components/organisms/Filters';
import { useMapState } from 'src/hooks/useMapState';
import { getWithDecline } from 'src/i18n/Decline';

import styles from 'src/components/organisms/MapView/styles.module.css';

export const MapView: React.FC = () => {
  const searchString = window.location.search.replace('?', '');

  const isOwner = searchString === 'owner';
  const isEditor = searchString === 'editor';

  const { added, counter, mapState, filters, setFilters, setPoints } =
    useMapState(isOwner, isEditor);
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
        onClick={setPoints}
        state={mapState}
        filter={{
          ...counter,
          onClick: () => setIsSidebarVisible(!isSidebarVisible),
        }}
      />

      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        title={{ id: 'components.organisms.MapView.filters' }}
        subTitle={getWithDecline(counter.to, [
          { id: 'components.organisms.MapView.filters.0' },
          { id: 'components.organisms.MapView.filters.1', values: counter },
          { id: 'components.organisms.MapView.filters.2', values: counter },
          { id: 'components.organisms.MapView.filters.3', values: counter },
        ])}
      >
        <Filters filters={filters} onChange={setFilters} mapState={mapState} />

        {isEditor && <textarea className={styles.code} defaultValue={added} />}
      </Sidebar>
    </div>
  );
};
