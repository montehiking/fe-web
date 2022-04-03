import { Meta, Story } from '@storybook/react/types-6-0';

import { Filters as FiltersComponent } from 'src/components/organisms/Filters';
import { decorators } from 'src/components/providers/StorybookProvider';
import { useData } from 'src/hooks/useData';

export default {
  title: 'Organisms/Filters',
  component: FiltersComponent,
  decorators,
} as Meta;

const Filters: Story = ({ isEditor }) => {
  const { filters, setFilters } = useData(isEditor);

  return (
    <FiltersComponent
      filters={filters}
      onChange={setFilters}
      isEditor={isEditor}
    />
  );
};

export const FiltersWithoutEditor = Filters.bind({});
FiltersWithoutEditor.args = {
  isEditor: false,
};

export const FiltersWithEditor = Filters.bind({});
FiltersWithEditor.args = {
  isEditor: true,
};
