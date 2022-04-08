import React from 'react';

import { MapView } from 'src/components/organisms/MapView';
import { Provider } from 'src/components/providers/Provider';

export const App: React.FC = () => (
  <Provider>
    <MapView />
  </Provider>
);
