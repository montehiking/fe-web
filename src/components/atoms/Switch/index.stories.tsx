import { Meta, Story } from '@storybook/react/types-6-0';

import { Switch as SwitchComponent } from 'src/components/atoms/Switch';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Atoms',
  component: SwitchComponent,
  decorators,
} as Meta;

export const Switch: Story = () => (
  <SwitchComponent
    label={{ id: 'constants.filters.labels.fortress' }}
    subLabel={{ id: 'components.organisms.Filters.subLabel.0' }}
  />
);
