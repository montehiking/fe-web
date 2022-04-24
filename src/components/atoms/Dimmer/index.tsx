import classNames from 'classnames';
import React from 'react';

import { useUnmount } from 'src/hooks/useUnmount';

import styles from 'src/components/atoms/Dimmer/styles.module.css';

export type Props = {
  isDisabled?: boolean;
  isVisible: boolean;
  onClose: () => void;
  zIndex?: number;
};

export const Dimmer: React.FC<Props> = ({
  isDisabled,
  isVisible,
  onClose,
  zIndex = 1001,
}) => {
  const { visible, inProgress } = useUnmount({ isVisible, delaySeconds: 0.3 });

  if (!visible) {
    return null;
  }

  return (
    <div
      className={classNames(styles.dimmer, {
        [styles.dimmer__hide]: inProgress,
        [styles.dimmer__disabled]: isDisabled,
      })}
      style={{ zIndex }}
      onClick={isDisabled ? undefined : onClose}
    />
  );
};
