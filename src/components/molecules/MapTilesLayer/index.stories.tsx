import { Meta, Story } from '@storybook/react/types-6-0';

import { MapTilesLayer as MapTilesLayerComponent } from 'src/components/molecules/MapTilesLayer';
import {
  decorators,
  mapDecorator,
} from 'src/components/providers/StorybookProvider';

export default {
  title: 'Molecules',
  component: MapTilesLayerComponent,
  decorators: [...decorators, mapDecorator],
} as Meta;

export const MapTilesLayer: Story = () => <MapTilesLayerComponent />;
