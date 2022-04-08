import { Meta, Story } from '@storybook/react/types-6-0';

import { Filters as FiltersComponent } from 'src/components/organisms/Filters';
import { decorators } from 'src/components/providers/StorybookProvider';
import { useMapState } from 'src/hooks/useMapState';

export default {
  title: 'Organisms/Filters',
  component: FiltersComponent,
  decorators,
} as Meta;

const Filters: Story = ({ isEditor }) => {
  const { filters, setFilters } = useMapState(isEditor);

  return <FiltersComponent filters={filters} onChange={setFilters} />;
};

export const FiltersWithoutEditor = Filters.bind({});
FiltersWithoutEditor.args = {
  isEditor: false,
};

export const FiltersWithEditor = Filters.bind({});
FiltersWithEditor.args = {
  isEditor: true,
};
