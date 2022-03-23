/**
 * https://ant.design/components/switch/
 */
import AntSwitch, { SwitchProps } from 'antd/lib/switch';
import React from 'react';

import { Msg, MsgProps } from 'src/i18n/Msg';

import styles from 'src/components/atoms/Switch/styles.module.css';

type Props = SwitchProps & {
  label: MsgProps;
};

export const Switch: React.FC<Props> = ({ label, ...props }) => (
  <label className={styles.label}>
    <AntSwitch {...props} />

    <span className={styles.span}>
      <Msg {...label} />
    </span>
  </label>
);
