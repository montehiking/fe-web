import React from 'react';

import { Switch } from 'src/components/atoms/Switch';
import { DictionaryKey } from 'src/i18n';
import { PointType } from 'src/points';

import styles from 'src/components/organisms/Filters/styles.module.css';

type FiltersState = Record<PointType, boolean>;

type Props = {
  filters: FiltersState;
  onChange: (value: FiltersState) => void;
};

const labels: Record<PointType, DictionaryKey> = {
  '': 'components.organisms.Filters.filters.empty',
  old_town: 'components.organisms.Filters.filters.old_town',
  fortress: 'components.organisms.Filters.filters.fortress',
  cave: 'components.organisms.Filters.filters.cave',
  natural: 'components.organisms.Filters.filters.natural',
  lighthouse: 'components.organisms.Filters.filters.lighthouse',
  monument: 'components.organisms.Filters.filters.monument',
  ruin: 'components.organisms.Filters.filters.ruin',
  historical: 'components.organisms.Filters.filters.historical',
};

const pointTypes = Object.keys(labels) as PointType[];

export const filtersInitial = pointTypes.reduce<FiltersState>(
  (acc, item) => {
    acc[item] = true;
    return acc;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {} as any
);

export const Filters: React.FC<Props> = ({ filters, onChange }) => (
  <div>
    {pointTypes.map((pointType) => (
      <div key={pointType} className={styles.item}>
        <Switch
          defaultChecked={filters[pointType]}
          onChange={(value) => onChange({ ...filters, [pointType]: value })}
          label={{ id: labels[pointType] }}
        />
      </div>
    ))}
  </div>
);
