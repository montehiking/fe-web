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
  size: 'big' | 'small';
  subTitle?: MsgProps;
  title: string | MsgProps;
};

export const Sidebar: React.FC<Props> = ({
  children,
  isVisible,
  onClose,
  size,
  subTitle,
  title,
}) => {
  const { visible, inProgress } = useUnmount({ isVisible, delaySeconds: 0.3 });
  const [isSidebarVisible, setIsSidebarVisible] = useState(!inProgress);

  useLayoutEffect(() => {
    if (!visible) {
      setIsSidebarVisible(false);
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  const isSmall = size === 'small';

  return (
    <aside
      className={classNames(styles.sidebar, {
        [styles.sidebar_small]: isSmall,
        [styles.sidebar__visible]: isSidebarVisible,
        [styles.sidebar_small__visible]: isSmall && isSidebarVisible,
        [styles.sidebar__hide]: inProgress,
        [styles.sidebar_small__hide]: isSmall && inProgress,
      })}
    >
      <div
        className={classNames(styles.container, {
          [styles.container_small]: isSmall,
        })}
      >
        <PageHeader onBack={onClose} title={title} subTitle={subTitle} />

        {children}
      </div>
    </aside>
  );
};
