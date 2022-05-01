import React from 'react';

import { Sidebar } from 'src/components/molecules/Sidebar';
import { PointCard } from 'src/components/organisms/PointCard';
import { useSidebarPoint } from 'src/hooks/useSidebarPoint';
import { Point } from 'src/types';

type Props = {
  allFiltredPoints: Point[];
};

export const SidebarPoint: React.FC<Props> = ({ allFiltredPoints }) => {
  const { isVisible, onClose, point, zoom } = useSidebarPoint(allFiltredPoints);

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
