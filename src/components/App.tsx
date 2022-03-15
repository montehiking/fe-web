import React from 'react';

import { Provider } from 'src/components/providers/Provider';

export const App: React.FC = () => (
  <Provider>
    <div className="app" data-testid="page"></div>
  </Provider>
);
