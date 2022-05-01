import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Sidebar as SidebarComponent } from 'src/components/molecules/Sidebar';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Molecules',
  component: SidebarComponent,
  decorators,
} as Meta;

export const Sidebar: Story = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="sb-box">
      <button type="button" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'hide' : 'show'}
      </button>
      <SidebarComponent
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        title={{ id: 'components.organisms.SidebarFilters.filters' }}
        subTitle={{ id: 'components.organisms.SidebarFilters.filters.0' }}
      >
        children
      </SidebarComponent>
    </div>
  );
};
