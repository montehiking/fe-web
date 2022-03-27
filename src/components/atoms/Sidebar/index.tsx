import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { useUnmount } from 'src/hooks/useUnmount';

import styles from 'src/components/atoms/Sidebar/styles.module.css';

type Props = {
  isVisible: boolean;
};

export const Sidebar: React.FC<Props> = ({ children, isVisible }) => {
  const { visible, inProgress } = useUnmount({ isVisible, delaySeconds: 0.3 });
  const [isModalVisible, setIsModalVisible] = useState(!inProgress);

  useEffect(() => {
    if (!visible) {
      setIsModalVisible(false);
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <aside
      className={classNames(styles.sidebar, {
        [styles.sidebar__visible]: isModalVisible,
        [styles.sidebar__hide]: inProgress,
      })}
    >
      <div className={styles.container}>{children}</div>
    </aside>
  );
};
