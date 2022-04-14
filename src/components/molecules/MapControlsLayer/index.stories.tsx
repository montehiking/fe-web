import { Meta, Story } from '@storybook/react/types-6-0';

import { MapControlsLayer as MapControlsLayerComponent } from 'src/components/molecules/MapControlsLayer';
import {
  decorators,
  mapDecorator,
} from 'src/components/providers/StorybookProvider';

export default {
  title: 'Molecules',
  component: MapControlsLayerComponent,
  decorators: [...decorators, mapDecorator],
} as Meta;

export const MapControlsLayer: Story = () => (
  <MapControlsLayerComponent
    filter={{ from: 456, to: 123, onClick: console.log }}
  />
);
