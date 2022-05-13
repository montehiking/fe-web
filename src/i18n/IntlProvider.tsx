import React from 'react';
import { IntlProvider as Provider } from 'react-intl';

import { defaultLocale, locales } from 'src/i18n';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const IntlProvider: React.FC<Props> = ({ children }) => {
  const locale = defaultLocale; // TODO: automatic language detection

  return (
    <Provider
      key={locale}
      locale={locale}
      messages={locales[locale].dictionary}
      defaultLocale={defaultLocale}
      textComponent={React.Fragment}
    >
      {children}
    </Provider>
  );
};
