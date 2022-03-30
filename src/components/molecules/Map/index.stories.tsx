import { Meta, Story } from '@storybook/react/types-6-0';

import { Map as MapComponent } from 'src/components/molecules/Map';
import { decorators } from 'src/components/providers/StorybookProvider';
import { usePoints } from 'src/hooks/usePoints';

export default {
  title: 'Molecules',
  component: MapComponent,
  decorators,
} as Meta;

export const Map: Story = () => {
  const { points } = usePoints(false);

  return (
    <MapComponent
      draggable
      filter={{ from: 100, to: 5, onClick: console.log }}
      onClick={console.log}
      points={points.slice(0, 10)}
    />
  );
};
