import { Meta, Story } from '@storybook/react/types-6-0';

import { Map as MapComponent } from 'src/components/molecules/Map';
import { decorators } from 'src/components/providers/StorybookProvider';
import { useData } from 'src/hooks/useData';

export default {
  title: 'Molecules',
  component: MapComponent,
  decorators,
} as Meta;

export const Map: Story = () => {
  const { data } = useData(false);

  return (
    <MapComponent
      filter={{ from: 100, to: 5, onClick: console.log }}
      onClick={console.log}
      points={data.points.slice(0, 10)}
    />
  );
};
