import classNames from 'classnames';
import React, { useLayoutEffect, useState } from 'react';

import { PageHeader } from 'src/components/atoms/PageHeader';
import { useUnmount } from 'src/hooks/useUnmount';
import { MsgProps } from 'src/i18n/Msg';

import styles from 'src/components/molecules/Sidebar/styles.module.css';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  isVisible: boolean;
  onClose: () => void;
  subTitle: MsgProps;
  title: MsgProps;
};

export const Sidebar: React.FC<Props> = ({
  children,
  isVisible,
  onClose,
  subTitle,
  title,
}) => {
  const { visible, inProgress } = useUnmount({ isVisible, delaySeconds: 0.3 });
  const [isModalVisible, setIsModalVisible] = useState(!inProgress);

  useLayoutEffect(() => {
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
      <div className={styles.container}>
        <PageHeader onBack={onClose} title={title} subTitle={subTitle} />

        {children}
      </div>
    </aside>
  );
};
