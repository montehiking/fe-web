import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import {
  Filters as FiltersComponent,
  filtersInitial,
} from 'src/components/organisms/Filters';
import { StorybookProvider } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Organisms',
  component: FiltersComponent,
} as Meta;

export const Filters: Story = () => {
  const [filters, setFilters] = useState(filtersInitial);

  return (
    <StorybookProvider>
      <FiltersComponent filters={filters} onChange={setFilters} />
    </StorybookProvider>
  );
};
