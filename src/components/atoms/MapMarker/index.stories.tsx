import { Meta, Story } from '@storybook/react/types-6-0';

import { MapMarker as MapMarkerComponent } from 'src/components/atoms/MapMarker';
import {
  decorators,
  mapDecorator,
} from 'src/components/providers/StorybookProvider';

export default {
  title: 'Atoms/MapMarker',
  component: MapMarkerComponent,
  decorators: [...decorators, mapDecorator],
} as Meta;

export const MapMarkerBlue: Story = () => (
  <MapMarkerComponent
    description="description"
    icon="blue"
    latLng={{ lat: 0, lng: 0 }}
    title="title"
    zoom={1}
  />
);

export const MapMarkerRed: Story = () => (
  <MapMarkerComponent
    description="description"
    icon="red"
    latLng={{ lat: 0, lng: 0 }}
    title="title"
    zoom={1}
  />
);

export const MapMarkerYellow: Story = () => (
  <MapMarkerComponent
    description="description"
    icon="yellow"
    latLng={{ lat: 0, lng: 0 }}
    title="title"
    zoom={1}
  />
);

export const MapWithoutLink: Story = () => (
  <MapMarkerComponent
    description="description"
    icon="red"
    latLng={{ lat: 0, lng: 0 }}
    title="title"
  />
);
