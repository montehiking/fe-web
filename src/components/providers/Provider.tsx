import React from 'react';

import { IntlProvider } from 'src/i18n/IntlProvider';

import 'antd/dist/antd.min.css';
import 'leaflet/dist/leaflet.css';

import 'src/styles/global.css';
import 'src/styles/leaflet.css';
import 'src/styles/theme.css';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const Provider: React.FC<Props> = ({ children }) => (
  <IntlProvider>{children}</IntlProvider>
);
