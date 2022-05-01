import { Meta, Story } from '@storybook/react/types-6-0';

import { PageHeader, Props } from 'src/components/atoms/PageHeader';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Atoms/PageHeader',
  component: PageHeader,
  decorators,
} as Meta;

const Template: Story<Props> = (args) => (
  <div className="sb-box">
    <PageHeader
      {...args}
      title={{ id: 'components.organisms.SidebarFilters.filters' }}
      onBack={console.log}
    />
  </div>
);

export const WithSubTitle = Template.bind({});
WithSubTitle.args = {
  subTitle: { id: 'components.organisms.SidebarFilters.filters.0' },
};

export const WithoutSubTitle = Template.bind({});
WithoutSubTitle.args = {
  subTitle: undefined,
};
