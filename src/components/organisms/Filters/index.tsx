import React from 'react';

import { List } from 'src/components/atoms/List';
import { Switch } from 'src/components/atoms/Switch';
import { labels } from 'src/constants/filters';
import { getWithDecline } from 'src/i18n/Decline';
import { Category, FiltersState } from 'src/types';
import { getCategories } from 'src/utils/filters';

import styles from 'src/components/organisms/Filters/styles.module.css';

type Props = {
  filters: FiltersState;
  onChange: (value: FiltersState) => void;
  isAdmin: boolean;
};

const defaultState = {
  checked: true,
  count: 0,
};

export const Filters: React.FC<Props> = ({ filters, onChange, isAdmin }) => (
  <List
    dataSource={getCategories(isAdmin)}
    renderItem={(category: Category) => {
      const { checked, count } = filters[category] ?? defaultState;
      const values = { count };

      return (
        <List.Item>
          <div className={styles.item}>
            <Switch
              defaultChecked={checked}
              onChange={(value) =>
                onChange({ ...filters, [category]: { count, checked: value } })
              }
              label={{ id: labels[category] }}
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
