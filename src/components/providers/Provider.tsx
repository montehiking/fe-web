import React from 'react';

import { IntlProvider } from 'src/i18n/IntlProvider';

import 'antd/dist/antd.min.css';
import 'leaflet/dist/leaflet.css';

import 'src/styles/global.css';
import 'src/styles/leaflet.css';
import 'src/styles/theme.css';

export const Provider: React.FC = ({ children }) => (
  <IntlProvider>{children}</IntlProvider>
);
