import { Meta, Story } from '@storybook/react/types-6-0';

import { MapMarker as MapMarkerComponent } from 'src/components/molecules/MapMarker';
import {
  decorators,
  mapDecorator,
} from 'src/components/providers/StorybookProvider';

export default {
  title: 'Molecules/MapMarker',
  component: MapMarkerComponent,
  decorators: [...decorators, mapDecorator],
} as Meta;

const MapMarker: Story = ({ icon, zoom }) => (
  <MapMarkerComponent
    description="description"
    icon={icon}
    latLng={{ lat: 0, lng: 0 }}
    name="name"
    onClick={console.log}
    zoom={zoom}
  />
);

export const MapMarkerBlue = MapMarker.bind({});
MapMarkerBlue.args = {
  icon: 'blue',
  zoom: 1,
};

export const MapMarkerGray = MapMarker.bind({});
MapMarkerGray.args = {
  icon: 'gray',
  zoom: 1,
};

export const MapMarkerRed = MapMarker.bind({});
MapMarkerRed.args = {
  icon: 'red',
  zoom: 1,
};

export const MapMarkerYellow = MapMarker.bind({});
MapMarkerYellow.args = {
  icon: 'yellow',
  zoom: 1,
};

export const MapWithoutLink = MapMarker.bind({});
MapWithoutLink.args = {
  icon: 'red',
  zoom: null,
};
