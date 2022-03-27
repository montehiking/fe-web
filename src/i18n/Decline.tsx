import React from 'react';

import { IntlShape, Msg, MsgProps, msg } from 'src/i18n/Msg';

export type DeclinePhrases = [MsgProps, MsgProps, MsgProps, MsgProps];

export const getWithDecline = (value: number, words: DeclinePhrases) => {
  if (value === 0) {
    return words[0];
  }

  const normalized = Math.abs(value) % 100;
  const num = value % 10;

  if (normalized > 10 && normalized < 20) {
    return words[3];
  }

  if (num > 1 && num < 5) {
    return words[2];
  }

  if (num === 1) {
    return words[1];
  }

  return words[3];
};

export const declinePhrase = (
  intl: IntlShape,
  value: number,
  words: DeclinePhrases
) => msg(intl, getWithDecline(value, words));

export const DeclinePhrase: React.FC<{
  value: number;
  words: DeclinePhrases;
}> = ({ value, words }) => <Msg {...getWithDecline(value, words)} />;
