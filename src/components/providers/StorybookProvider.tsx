import React from 'react';

import { Provider } from 'src/components/providers/Provider';

export const StorybookProvider: React.FC = ({ children }) => (
  <Provider>{children}</Provider>
);
