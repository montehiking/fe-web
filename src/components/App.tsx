import React from 'react';

import { MapView } from 'src/components/molecules/MapView';
import { Provider } from 'src/components/providers/Provider';

export const App: React.FC = () => (
  <Provider>
    <div className="app" data-testid="page">
      <MapView isAdmin={false} />
    </div>
  </Provider>
);
