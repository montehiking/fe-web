import React from 'react';

import { Polyline } from 'src/components/atoms/Polyline';
import { Route } from 'src/types';

type Props = {
  infoWindow: google.maps.InfoWindow;
  map: google.maps.Map;
  routes: Route[];
};

export const RoutesLayout: React.FC<Props> = ({ infoWindow, map, routes }) => {
  const renderRoute = ({ properties, geometry }: Route) => {
    const coordinates = geometry.coordinates.map(([lng, lat]) => ({
      lat,
      lng,
    }));

    const onClick = (
      e: google.maps.MapMouseEvent,
      polyline: google.maps.Polyline
    ) => {
      infoWindow.setPosition(e.latLng);
      infoWindow.setContent(
        `<div class="poi-info-window gm-style">
          <div class="title full-width">${properties.title}</div>
          <div class="point-description full-width">${properties.description}</div>
        </div>`
      );
      infoWindow.open(map, polyline);
    };

    return (
      <Polyline
        key={`${geometry.coordinates[0][0]}${geometry.coordinates[0][1]}`}
        map={map}
        onClick={onClick}
        path={coordinates}
        geodesic
        strokeColor="#1890ff"
        strokeOpacity={0.75}
        strokeWeight={3}
      />
    );
  };

  return <>{routes.map(renderRoute)}</>;
};
