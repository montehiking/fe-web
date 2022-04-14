import { Meta, Story } from '@storybook/react/types-6-0';

import { MapRoutesLayer as MapRoutesLayerComponent } from 'src/components/molecules/MapRoutesLayer';
import {
  decorators,
  mapDecorator,
} from 'src/components/providers/StorybookProvider';
import { Route } from 'src/types';

export default {
  title: 'Molecules',
  component: MapRoutesLayerComponent,
  decorators: [...decorators, mapDecorator],
} as Meta;

const routes: Route[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [18.893336946167118, 42.26640324517598],
        [18.926866507872543, 42.20901835902516],
      ],
    },
    properties: {
      title: 'Pržno - Manastir Praskvica',
      description: 'тропа',
      category: 'routes',
    },
  },
];

export const MapRoutesLayer: Story = () => (
  <MapRoutesLayerComponent routes={routes} />
);
