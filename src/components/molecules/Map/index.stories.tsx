import { Meta, Story } from '@storybook/react/types-6-0';

import { Map as MapComponent } from 'src/components/molecules/Map';
import { decorators } from 'src/components/providers/StorybookProvider';
import { points } from 'src/data/points';

export default {
  title: 'Molecules',
  component: MapComponent,
  decorators,
} as Meta;

export const Map: Story = () => (
  <MapComponent
    onClick={console.log}
    markers={points.slice(0, 5)}
    filter={{ from: 100, to: 5, onClick: console.log }}
    draggable
  />
);
