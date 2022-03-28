/**
 * https://ant.design/components/switch/
 */
import AntSwitch, { SwitchProps } from 'antd/lib/switch';
import React from 'react';

import { Msg, MsgProps } from 'src/i18n/Msg';

import styles from 'src/components/atoms/Switch/styles.module.css';

type Props = SwitchProps & {
  label: MsgProps;
  subLabel: MsgProps;
};

export const Switch: React.FC<Props> = ({ label, subLabel, ...props }) => (
  <label className={styles.switch}>
    <AntSwitch {...props} />

    <span className={styles.labels}>
      <span className={styles.label}>
        <Msg {...label} />
      </span>
      <span className={styles.subLabel}>
        <Msg {...subLabel} />
      </span>
    </span>
  </label>
);
