import React from 'react';

import { Sidebar } from 'src/components/molecules/Sidebar';
import { PointCard } from 'src/components/organisms/PointCard';
import { PointState } from 'src/types';

type Props = PointState & {
  onClose: () => void;
};

export const SidebarPoint: React.FC<Props> = ({
  isVisible,
  onClose,
  current,
  zoom,
}) => (
  <Sidebar
    isVisible={isVisible}
    onClose={onClose}
    size="small"
    title={current?.properties.name || ''}
  >
    {current && <PointCard point={current} zoom={zoom} />}
  </Sidebar>
);
