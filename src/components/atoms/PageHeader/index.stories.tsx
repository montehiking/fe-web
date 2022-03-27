import { Meta, Story } from '@storybook/react/types-6-0';

import { PageHeader as PageHeaderComponent } from 'src/components/atoms/PageHeader';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Atoms',
  component: PageHeaderComponent,
  decorators,
} as Meta;

export const PageHeader: Story = () => (
  <div className="sb-gray-box">
    <PageHeaderComponent
      title={{ id: 'components.organisms.Filters.filters.fortress' }}
      onBack={console.log}
    />
  </div>
);
