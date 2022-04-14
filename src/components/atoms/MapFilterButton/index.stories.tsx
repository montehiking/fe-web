import { Meta, Story } from '@storybook/react/types-6-0';

import { MapFilterButton as MapFilterButtonComponent } from 'src/components/atoms/MapFilterButton';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Atoms/MapFilterButton',
  component: MapFilterButtonComponent,
  decorators,
} as Meta;

const MapFilterButton: Story = ({ from, to }) => (
  <MapFilterButtonComponent from={from} to={to} onClick={console.log} />
);

export const MapFilterButtonDefault = MapFilterButton.bind({});
MapFilterButtonDefault.args = {
  from: 123,
  to: 123,
};

export const MapFilterButtonActive = MapFilterButton.bind({});
MapFilterButtonActive.args = {
  from: 456,
  to: 123,
};
