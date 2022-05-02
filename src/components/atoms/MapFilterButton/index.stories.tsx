import { Meta, Story } from '@storybook/react/types-6-0';

import { MapFilterButton } from 'src/components/atoms/MapFilterButton';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Atoms/MapFilterButton',
  component: MapFilterButton,
  decorators,
} as Meta;

const Template: Story = ({ from, to }) => (
  <MapFilterButton from={from} to={to} onClick={console.log} />
);

export const Default = Template.bind({});
Default.args = {
  from: 123,
  to: 123,
};

export const Active = Template.bind({});
Active.args = {
  from: 456,
  to: 123,
};
