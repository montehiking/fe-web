import { Meta, Story } from '@storybook/react/types-6-0';

import { Map as MapComponent } from 'src/components/molecules/Map';
import { decorators } from 'src/components/providers/StorybookProvider';

export default {
  title: 'Molecules',
  component: MapComponent,
  decorators,
} as Meta;

export const Map: Story = () => (
  <MapComponent
    onClick={console.log}
    markers={[
      {
        lat: 42.275133659000936,
        lng: 18.826982975006104,
        type: 'fortress',
        title: 'Tvrđava Mogren',
        description: 'австро-венгерский форт',
      },
      {
        lat: 42.39580006812814,
        lng: 18.764165868455795,
        type: 'fortress',
        title: 'Tvrđava Goražda',
        description: 'австро-венгерский форт',
      },
      {
        lat: 42.46789412201348,
        lng: 19.266767864055097,
        type: 'ruin',
        title: 'Duklja (Diokleja)',
        description: 'древнеримский город',
      },
    ]}
    draggable
  />
);
