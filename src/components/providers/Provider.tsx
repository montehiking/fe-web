import React from 'react';

import { MapProvider } from 'src/components/providers/MapProvider';
import { IntlProvider } from 'src/i18n/IntlProvider';

import 'antd/dist/antd.min.css';

import 'src/styles/global.css';
import 'src/styles/theme.css';

export const Provider: React.FC = ({ children }) => (
  <IntlProvider>
    <MapProvider>{children}</MapProvider>
  </IntlProvider>
);
