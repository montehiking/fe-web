import { Meta, Story } from '@storybook/react/types-6-0';

import { PlaceLink as PlaceLinkComponent } from 'src/components/atoms/PlaceLink';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Atoms',
  component: PlaceLinkComponent,
  decorators,
} as Meta;

export const PlaceLink: Story = () => (
  <PlaceLinkComponent place={{ lat: 42.275134, lng: 18.826983, zoom: 10 }} />
);
