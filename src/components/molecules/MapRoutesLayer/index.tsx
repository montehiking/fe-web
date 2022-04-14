import React, { Fragment } from 'react';
import { Polyline } from 'react-leaflet';

import { MapMarker } from 'src/components/atoms/MapMarker';
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
        <Fragment
          key={`${geometry.coordinates[0][0]}${geometry.coordinates[0][1]}`}
        >
          <Polyline
            pathOptions={{ color: '#1890ff' }}
            positions={coordinates}
          />

          <MapMarker
            icon="blue"
            latLng={coordinates[0]}
            title={properties.title}
            description={properties.description}
          />
          <MapMarker
            icon="blue"
            latLng={coordinates[coordinates.length - 1]}
            title={properties.title}
            description={properties.description}
          />
        </Fragment>
      );
    })}
  </>
);
