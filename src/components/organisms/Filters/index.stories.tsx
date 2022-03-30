import { Meta, Story } from '@storybook/react/types-6-0';

import { Filters as FiltersComponent } from 'src/components/organisms/Filters';
import { decorators } from 'src/components/providers/StorybookProvider';
import { usePoints } from 'src/hooks/usePoints';

export default {
  title: 'Organisms/Filters',
  component: FiltersComponent,
  decorators,
} as Meta;

const Filters: Story = ({ isAdmin }) => {
  const { filters, setFilters } = usePoints(isAdmin);

  return (
    <FiltersComponent
      filters={filters}
      onChange={setFilters}
      isAdmin={isAdmin}
    />
  );
};

export const FiltersWithoutAdmin = Filters.bind({});
FiltersWithoutAdmin.args = {
  isAdmin: false,
};

export const FiltersWithAdmin = Filters.bind({});
FiltersWithAdmin.args = {
  isAdmin: true,
};
