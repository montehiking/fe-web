import React from 'react';

import styles from 'src/components/atoms/Sidebar/styles.module.css';

export const Sidebar: React.FC = ({ children }) => (
  <aside className={styles.aside}>{children}</aside>
);
