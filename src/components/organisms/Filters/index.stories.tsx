import { Meta, Story } from '@storybook/react/types-6-0';

import { Filters as FiltersComponent } from 'src/components/organisms/Filters';
import { decorators } from 'src/components/providers/StorybookProvider';
import { useMapState } from 'src/hooks/useMapState';

export default {
  title: 'Organisms',
  component: FiltersComponent,
  decorators,
} as Meta;

export const Filters: Story = () => {
  const { actions, filters, map } = useMapState(false);

  if (!filters.state) {
    return <></>;
  }

  return (
    <FiltersComponent
      filters={filters.state}
      mapState={map.state}
      onChange={actions.setFilters}
    />
  );
};
