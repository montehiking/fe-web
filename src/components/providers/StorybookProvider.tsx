import { Meta } from '@storybook/react/types-6-0';

import { Provider } from 'src/components/providers/Provider';

export const decorators: Required<Meta['decorators']> = [
  (Story) => (
    <Provider>
      <Story />
    </Provider>
  ),
];
