import { Meta, Story } from '@storybook/react/types-6-0';
import { useLayoutEffect } from 'react';
import { useMap } from 'react-leaflet';

import { MapGeolocationMarker as MapGeolocationMarkerComponent } from 'src/components/atoms/MapGeolocationMarker';
import {
  decorators,
  mapDecorator,
} from 'src/components/providers/StorybookProvider';

export default {
  title: 'Atoms',
  component: MapGeolocationMarkerComponent,
  decorators: [...decorators, mapDecorator],
} as Meta;

export const MapGeolocationMarker: Story = () => {
  const map = useMap();

  useLayoutEffect(() => {
    map?.locate();

    return () => {
      map?.stopLocate();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!map]);

  return <MapGeolocationMarkerComponent />;
};
