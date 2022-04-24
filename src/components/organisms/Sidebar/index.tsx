import React from 'react';

import { Dimmer } from 'src/components/atoms/Dimmer';
import { Sidebar as SidebarComponent } from 'src/components/molecules/Sidebar';
import { Filters } from 'src/components/organisms/Filters';
import { getWithDecline } from 'src/i18n/Decline';
import { FiltersState, MapState, SetFilters } from 'src/types';
import { prepareTempPoint } from 'src/utils/filters';
import { isLandscape } from 'src/utils/lib';

import styles from 'src/components/organisms/Sidebar/styles.module.css';

type Props = {
  counter: {
    from: number;
    to: number;
  };
  filters: FiltersState;
  isEditor: boolean;
  isVisible: boolean;
  mapState: MapState;
  onClose: () => void;
  setFilters: SetFilters;
};

export const Sidebar: React.FC<Props> = ({
  counter,
  filters,
  isEditor,
  isVisible,
  mapState,
  onClose,
  setFilters,
}) => (
  <>
    <Dimmer isVisible={isVisible && !isLandscape()} onClose={onClose} />

    <SidebarComponent
      isVisible={isVisible}
      onClose={onClose}
      title={{ id: 'components.organisms.Sidebar.filters' }}
      subTitle={getWithDecline(counter.to, [
        { id: 'components.organisms.Sidebar.filters.0' },
        { id: 'components.organisms.Sidebar.filters.1', values: counter },
        { id: 'components.organisms.Sidebar.filters.2', values: counter },
        { id: 'components.organisms.Sidebar.filters.3', values: counter },
      ])}
    >
      <Filters filters={filters} onChange={setFilters} mapState={mapState} />

      {isEditor && (
        <textarea
          key={mapState.newPoint?.geometry.coordinates.join()}
          className={styles.code}
          defaultValue={prepareTempPoint(mapState.newPoint)}
        />
      )}
    </SidebarComponent>
  </>
);
