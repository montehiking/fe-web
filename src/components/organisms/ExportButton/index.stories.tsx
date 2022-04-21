import { Meta, Story } from '@storybook/react/types-6-0';

import ExportButtonComponent from 'src/components/organisms/ExportButton';
import { decorators } from 'src/components/providers/StorybookProvider';
import { useMapState } from 'src/hooks/useMapState';

export default {
  title: 'Organisms',
  component: ExportButtonComponent,
  decorators,
} as Meta;

export const ExportButton: Story = () => {
  const { mapState } = useMapState(false);

  return <ExportButtonComponent mapState={mapState} />;
};
