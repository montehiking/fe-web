import { DecoratorFunction } from '@storybook/csf';
import { MapContainer } from 'react-leaflet';

import { Provider } from 'src/components/providers/Provider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Decorator = DecoratorFunction<any, any>;

export const decorators: Decorator[] = [
  (Story) => (
    <Provider>
      <Story />
    </Provider>
  ),
];

export const mapDecorator: Decorator = (Story) => (
  <MapContainer zoomControl={false} className="sb-box" center={[0, 0]} zoom={1}>
    <Story />
  </MapContainer>
);
