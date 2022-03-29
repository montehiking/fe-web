import { Meta, Story } from '@storybook/react/types-6-0';

import { GeolocationButton as GeolocationButtonComponent } from 'src/components/molecules/GeolocationButton';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Molecules',
  component: GeolocationButtonComponent,
  decorators,
} as Meta;

export const GeolocationButton: Story = () => <GeolocationButtonComponent />;
