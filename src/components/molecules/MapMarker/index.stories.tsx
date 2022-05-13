import { Meta, Story } from '@storybook/react/types-6-0';

import { MapMarker } from 'src/components/molecules/MapMarker';
import {
  decorators,
  mapDecorator,
} from 'src/components/providers/StorybookProvider';

export default {
  title: 'Molecules/MapMarker',
  component: MapMarker,
  decorators: [...decorators, mapDecorator],
} as Meta;

const Template: Story = ({ icon, zoom }) => (
  <MapMarker
    description="description"
    icon={icon}
    latLng={{ lat: 0, lng: 0 }}
    name="name"
    onClick={console.log}
    zoom={zoom}
  />
);

export const Blue = Template.bind({});
Blue.args = {
  icon: 'blue',
  zoom: 1,
};

export const Gray = Template.bind({});
Gray.args = {
  icon: 'gray',
  zoom: 1,
};

export const Red = Template.bind({});
Red.args = {
  icon: 'red',
  zoom: 1,
};

export const Yellow = Template.bind({});
Yellow.args = {
  icon: 'yellow',
  zoom: 1,
};

export const WithoutLink = Template.bind({});
WithoutLink.args = {
  icon: 'red',
  zoom: null,
};
