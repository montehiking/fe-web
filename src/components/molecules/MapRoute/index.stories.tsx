import { Meta, Story } from '@storybook/react/types-6-0';

import { MapRoute as MapRouteComponent } from 'src/components/molecules/MapRoute';
import {
  decorators,
  mapDecorator,
} from 'src/components/providers/StorybookProvider';

export default {
  title: 'Molecules/MapRoute',
  component: MapRouteComponent,
  decorators: [...decorators, mapDecorator],
} as Meta;

const Template: Story = ({ notVerified }) => (
  <MapRouteComponent
    description="description"
    coordinates={[
      { lng: 18.893336946167118, lat: 42.26640324517598 },
      { lng: 18.926866507872543, lat: 42.20901835902516 },
    ]}
    notVerified={notVerified}
    name="name"
  />
);

export const Verified = Template.bind({});
Verified.args = {
  notVerified: false,
};

export const NotVerified = Template.bind({});
NotVerified.args = {
  notVerified: true,
};
