import { Wrapper } from '@googlemaps/react-wrapper';
import React from 'react';

import { GOOGLE_MAPS_API_KEY } from 'src/constants/env';

export const MapProvider: React.FC = ({ children }) => (
  <Wrapper
    apiKey={GOOGLE_MAPS_API_KEY}
    render={() => <div data-testid="page" />}
  >
    {children}
  </Wrapper>
);
