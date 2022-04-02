import React from 'react';

import { List } from 'src/components/atoms/List';
import { Switch } from 'src/components/atoms/Switch';
import { DictionaryKey } from 'src/i18n';
import { getWithDecline } from 'src/i18n/Decline';
import { FiltersState, PointType } from 'src/types';

import styles from 'src/components/organisms/Filters/styles.module.css';

type Props = {
  filters: FiltersState;
  onChange: (value: FiltersState) => void;
  isAdmin: boolean;
};

const labels: Record<PointType, DictionaryKey> = {
  '': 'components.organisms.Filters.filters.empty',
  old_town: 'components.organisms.Filters.filters.old_town',
  fortress: 'components.organisms.Filters.filters.fortress',
  palace: 'components.organisms.Filters.filters.palace',
  christian: 'components.organisms.Filters.filters.christian',
  cave: 'components.organisms.Filters.filters.cave',
  waterfall: 'components.organisms.Filters.filters.waterfall',
  nature: 'components.organisms.Filters.filters.nature',
  lighthouse: 'components.organisms.Filters.filters.lighthouse',
  bridge: 'components.organisms.Filters.filters.bridge',
  monument: 'components.organisms.Filters.filters.monument',
  other: 'components.organisms.Filters.filters.other',
};

const adminPointTypes = Object.keys(labels) as PointType[];
const pointTypes = adminPointTypes.filter((pointType) => pointType !== '');

const defaultState = {
  checked: true,
  count: 0,
};

export const Filters: React.FC<Props> = ({ filters, onChange, isAdmin }) => (
  <List
    dataSource={isAdmin ? adminPointTypes : pointTypes}
    renderItem={(pointType: PointType) => {
      const { checked, count } = filters[pointType] ?? defaultState;
      const values = { count };

      return (
        <List.Item>
          <div className={styles.item}>
            <Switch
              defaultChecked={checked}
              onChange={(value) =>
                onChange({ ...filters, [pointType]: { count, checked: value } })
              }
              label={{ id: labels[pointType] }}
              subLabel={getWithDecline(count, [
                { id: 'components.organisms.Filters.subLabel.0', values },
                { id: 'components.organisms.Filters.subLabel.1', values },
                { id: 'components.organisms.Filters.subLabel.2', values },
                { id: 'components.organisms.Filters.subLabel.3', values },
              ])}
            />
          </div>
        </List.Item>
      );
    }}
  />
);
