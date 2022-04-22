import { Meta, Story } from '@storybook/react/types-6-0';

import { MapMarkersLayer as MapMarkersLayerComponent } from 'src/components/molecules/MapMarkersLayer';
import {
  decorators,
  mapDecorator,
} from 'src/components/providers/StorybookProvider';
import { Point } from 'src/types';

export default {
  title: 'Molecules',
  component: MapMarkersLayerComponent,
  decorators: [...decorators, mapDecorator],
} as Meta;

const points: Point[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [19.091258949410722, 42.24619402714383],
    },
    properties: {
      name: 'Most na Crmnici',
      description: 'старинный мост',
      category: 'bridge',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [19.091367718576958, 43.14370625468662],
    },
    properties: {
      name: 'Titova pećina',
      description: 'пещера',
      category: 'cave',
    },
  },
];

export const MapMarkersLayer: Story = () => (
  <MapMarkersLayerComponent
    initialZoom={9}
    onClick={console.log}
    onZoom={console.log}
    points={points}
  />
);
