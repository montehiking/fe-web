import React, { useState } from 'react';

import { Map } from 'src/components/molecules/Map';
import { Sidebar } from 'src/components/molecules/Sidebar';
import { Filters } from 'src/components/organisms/Filters';
import { useData } from 'src/hooks/useData';
import { getWithDecline } from 'src/i18n/Decline';

import styles from 'src/components/organisms/MapView/styles.module.css';

type Props = {
  isEditor: boolean;
};

export const MapView: React.FC<Props> = ({ isEditor }) => {
  const { added, counter, data, filters, setFilters, setPoints } =
    useData(isEditor);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <div className={styles.wrapper} data-testid="page">
      <Map
        onClick={setPoints}
        points={data.points}
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
        <Filters filters={filters} onChange={setFilters} isEditor={isEditor} />

        {isEditor && <pre className={styles.code}>{added}</pre>}
      </Sidebar>
    </div>
  );
};
