import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Dimmer, Props } from 'src/components/atoms/Dimmer';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Atoms/Dimmer',
  component: Dimmer,
  decorators,
} as Meta;

const Template: Story<Props> = (args) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Dimmer
      {...args}
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
    />
  );
};

export const Closable = Template.bind({});
Closable.args = {
  isDisabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};
