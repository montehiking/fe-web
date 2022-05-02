import React from 'react';

import { Sidebar } from 'src/components/molecules/Sidebar';
import { PointCard } from 'src/components/organisms/PointCard';
import { useSidebarPoint } from 'src/hooks/useSidebarPoint';
import { Point } from 'src/types';

type Props = {
  points: Point[];
};

export const SidebarPoint: React.FC<Props> = ({ points }) => {
  const { isVisible, onClose, point, zoom } = useSidebarPoint(points);

  return (
    <Sidebar
      isVisible={isVisible}
      onClose={onClose}
      size="small"
      title={point?.properties.name || ''}
    >
      {point && <PointCard point={point} zoom={zoom} />}
    </Sidebar>
  );
};
