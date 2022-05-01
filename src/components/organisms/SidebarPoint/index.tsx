import React from 'react';

import { Sidebar } from 'src/components/molecules/Sidebar';
import { useSidebarPoint } from 'src/hooks/useSidebarPoint';
import { Point } from 'src/types';

type Props = {
  allFiltredPoints: Point[];
};

export const SidebarPoint: React.FC<Props> = ({ allFiltredPoints }) => {
  const { point, isVisible, onClose } = useSidebarPoint(allFiltredPoints);

  return (
    <Sidebar
      isVisible={isVisible}
      onClose={onClose}
      title={point?.properties.name || ''}
    >
      TODO
    </Sidebar>
  );
};
