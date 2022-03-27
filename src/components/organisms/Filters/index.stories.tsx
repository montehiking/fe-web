import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import {
  Filters as FiltersComponent,
  filtersInitial,
} from 'src/components/organisms/Filters';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Organisms',
  component: FiltersComponent,
  decorators,
} as Meta;

const Filters: Story = ({ isAdmin }) => {
  const [filters, setFilters] = useState(filtersInitial);

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
