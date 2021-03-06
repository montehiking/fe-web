import React from 'react';

import { MapRoute } from 'src/components/molecules/MapRoute';
import { LatLng, Route } from 'src/types';

type Props = {
  routes: Route[];
};

export const MapRoutesLayer: React.FC<Props> = ({ routes }) => (
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
          coordinates={coordinates}
          description={properties.description}
          key={`${geometry.coordinates[0][0]}${geometry.coordinates[0][1]}`}
          name={properties.name}
          notVerified={properties.notVerified}
        />
      );
    })}
  </>
);
