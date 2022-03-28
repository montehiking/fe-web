import { useEffect, useState } from 'react';

type Props = {
  isVisible: boolean;
  delaySeconds: number;
};

export const useUnmount = ({ isVisible, delaySeconds }: Props) => {
  const [visible, setVisible] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isVisible && !visible) {
      setVisible(true);
      setInProgress(false);
    } else if (!isVisible && visible) {
      setInProgress(true);

      timeout = setTimeout(() => {
        if (setVisible) {
          setVisible(false);
          setInProgress(false);
        }
      }, 1000 * delaySeconds);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isVisible, visible, delaySeconds]);

  return { visible, inProgress };
};
