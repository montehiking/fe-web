import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { Provider } from 'src/components/providers/Provider';

export const StorybookProvider: React.FC = ({ children }) => (
  <Provider>{children}</Provider>
);

export const decorators: Required<Meta['decorators']> = [
  (Story) => (
    <StorybookProvider>
      <Story />
    </StorybookProvider>
  ),
];
