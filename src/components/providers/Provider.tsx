import React from 'react';

import { IntlProvider } from 'src/i18n/IntlProvider';

// import 'antd/dist/antd.min.css';
import 'src/styles/global.css';

export const Provider: React.FC = ({ children }) => (
  <IntlProvider>{children}</IntlProvider>
);
