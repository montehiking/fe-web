import React from 'react';

import { List } from 'src/components/atoms/List';
import { Switch } from 'src/components/atoms/Switch';
import { FiltersState } from 'src/constants/filters';
import { DictionaryKey } from 'src/i18n';
import { getWithDecline } from 'src/i18n/Decline';
import { PointType } from 'src/points';

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
  cave: 'components.organisms.Filters.filters.cave',
  waterfall: 'components.organisms.Filters.filters.waterfall',
  park: 'components.organisms.Filters.filters.park',
  lighthouse: 'components.organisms.Filters.filters.lighthouse',
  monument: 'components.organisms.Filters.filters.monument',
  other: 'components.organisms.Filters.filters.other',
};

const pointTypes = Object.keys(labels) as PointType[];

export const Filters: React.FC<Props> = ({ filters, onChange, isAdmin }) => {
  const dataSource = isAdmin
    ? pointTypes
    : pointTypes.filter((pointType) => pointType !== '');

  return (
    <List
      dataSource={dataSource}
      renderItem={(pointType) => {
        const { checked, count } = filters[pointType] ?? {
          checked: true,
          count: 0,
        };

        const values = { count };

        return (
          <List.Item>
            <div className={styles.item}>
              <Switch
                defaultChecked={checked}
                onChange={(value) =>
                  onChange({
                    ...filters,
                    [pointType]: { count, checked: value },
                  })
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
};
