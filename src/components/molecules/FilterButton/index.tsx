import React from 'react';

import styles from 'src/components/molecules/FilterButton/styles.module.css';

export type Props = {
  from: number;
  to: number;
  onClick: () => void;
};

export const FilterButton: React.FC<Props> = ({ from, to, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    <span>{from}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 20 20"
    >
      <path d="M10 13 1 1h18l-9 12z" />
      <path d="M12 9H8v8l4 2V9z" />
    </svg>
    <span>{to}</span>
  </button>
);
