import { Meta, Story } from '@storybook/react/types-6-0';

import { Sidebar as SidebarComponent } from 'src/components/atoms/Sidebar';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Atoms',
  component: SidebarComponent,
  decorators,
} as Meta;

export const Sidebar: Story = () => (
  <SidebarComponent>children</SidebarComponent>
);
