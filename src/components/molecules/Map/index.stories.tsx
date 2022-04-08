import { Meta, Story } from '@storybook/react/types-6-0';

import { Map as MapComponent } from 'src/components/molecules/Map';
import { decorators } from 'src/components/providers/StorybookProvider';
import { useMapState } from 'src/hooks/useMapState';

export default {
  title: 'Molecules',
  component: MapComponent,
  decorators,
} as Meta;

export const Map: Story = () => {
  const { mapState } = useMapState(false, false);

  return (
    <MapComponent
      filter={{ from: 100, to: 5, onClick: console.log }}
      onClick={console.log}
      state={mapState}
    />
  );
};
