import React from 'react';

import { MapRoute } from 'src/components/molecules/MapRoute';
import { LatLng, Route } from 'src/types';

type Props = {
  routes: Route[];
};

export const RoutesLayer: React.FC<Props> = ({ routes }) => (
  <>
    {routes.map(({ properties, geometry }: Route) => {
      const coordinates = geometry.coordinates.map(
        ([lng, lat]): LatLng => ({
          lat,
          lng,
        })
      );

      return (
        <MapRoute
          key={`${geometry.coordinates[0][0]}${geometry.coordinates[0][1]}`}
          title={properties.title}
          description={properties.description}
          coordinates={coordinates}
        />
      );
    })}
  </>
);
