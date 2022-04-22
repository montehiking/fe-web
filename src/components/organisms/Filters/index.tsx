import React, { Suspense, lazy } from 'react';

import { List } from 'src/components/atoms/List';
import { Spin } from 'src/components/atoms/Spin';
import { Switch } from 'src/components/atoms/Switch';
import { POINT_ROUTES } from 'src/constants';
import { labels } from 'src/constants/filters';
import { getWithDecline } from 'src/i18n/Decline';
import { Category, FiltersState, MapState } from 'src/types';
import { categories } from 'src/utils/filters';

import styles from 'src/components/organisms/Filters/styles.module.css';

type Props = {
  filters: FiltersState;
  onChange: (value: FiltersState) => void;
  mapState: MapState;
};

const ExportButton = lazy(
  () => import('src/components/organisms/ExportButton')
);

export const Filters: React.FC<Props> = ({ filters, onChange, mapState }) => {
  const renderItem = (category: Category) => {
    const { checked, count } = filters[category];
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
            subLabel={getWithDecline(
              count,
              category !== POINT_ROUTES
                ? [
                    { id: 'components.organisms.Filters.subLabel.0', values },
                    { id: 'components.organisms.Filters.subLabel.1', values },
                    { id: 'components.organisms.Filters.subLabel.2', values },
                    { id: 'components.organisms.Filters.subLabel.3', values },
                  ]
                : [
                    { id: 'components.organisms.Filters.subLabel.4', values },
                    { id: 'components.organisms.Filters.subLabel.5', values },
                    { id: 'components.organisms.Filters.subLabel.6', values },
                    { id: 'components.organisms.Filters.subLabel.7', values },
                  ]
            )}
          />
        </div>
      </List.Item>
    );
  };

  return (
    <List
      dataSource={categories}
      renderItem={renderItem}
      footer={
        <Suspense
          fallback={
            <div className={styles.preloader}>
              <Spin size="small" />
            </div>
          }
        >
          <ExportButton mapState={mapState} />
        </Suspense>
      }
    />
  );
};
