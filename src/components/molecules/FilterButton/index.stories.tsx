import { Meta, Story } from '@storybook/react/types-6-0';

import { FilterButton as FilterButtonComponent } from 'src/components/molecules/FilterButton';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Molecules',
  component: FilterButtonComponent,
  decorators,
} as Meta;

export const FilterButton: Story = () => (
  <FilterButtonComponent from={1234} to={567} onClick={console.log} />
);
