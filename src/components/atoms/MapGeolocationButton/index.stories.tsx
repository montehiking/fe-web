import { Meta, Story } from '@storybook/react/types-6-0';

import { MapGeolocationButton as MapGeolocationButtonComponent } from 'src/components/atoms/MapGeolocationButton';
import {
  decorators,
  mapDecorator,
} from 'src/components/providers/StorybookProvider';

export default {
  title: 'Atoms',
  component: MapGeolocationButtonComponent,
  decorators: [...decorators, mapDecorator],
} as Meta;

export const MapGeolocationButton: Story = () => (
  <MapGeolocationButtonComponent />
);
