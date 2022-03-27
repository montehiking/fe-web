import { Meta, Story } from '@storybook/react/types-6-0';

import { FilterButton as FilterButtonComponent } from 'src/components/molecules/FilterButton';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Molecules/FilterButton',
  component: FilterButtonComponent,
  decorators,
} as Meta;

const FilterButton: Story = ({ from, to }) => (
  <FilterButtonComponent from={from} to={to} onClick={console.log} />
);

export const FilterButtonDefault = FilterButton.bind({});
FilterButtonDefault.args = {
  from: 123,
  to: 123,
};

export const FilterButtonActive = FilterButton.bind({});
FilterButtonActive.args = {
  from: 456,
  to: 123,
};
