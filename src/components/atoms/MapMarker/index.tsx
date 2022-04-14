import { BaseIconOptions, Icon, Point } from 'leaflet';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

import { Msg } from 'src/i18n/Msg';
import { LatLng, Zoom } from 'src/types';
import { createGoogleMapsURL } from 'src/utils/maps';

const iconOptions: BaseIconOptions = {
  iconSize: new Point(27, 43),
  iconAnchor: [13.5, 41],
};

const mapIcons = {
  blue: new Icon({ iconUrl: '/pin/blue.svg', ...iconOptions }),
  red: new Icon({ iconUrl: '/pin/red.svg', ...iconOptions }),
  yellow: new Icon({ iconUrl: '/pin/yellow.svg', ...iconOptions }),
};

type Props = {
  description: string;
  icon: keyof typeof mapIcons;
  latLng: LatLng;
  title: string;
  zoom?: Zoom;
};

export const MapMarker: React.FC<Props> = ({
  description,
  icon,
  latLng,
  title,
  zoom,
}) => (
  <Marker icon={mapIcons[icon]} position={latLng} title={title}>
    <Popup>
      <h3>{title}</h3>
      <p className="popup-description">{description}</p>

      {zoom && (
        <p className="popup-link">
          <a
            href={createGoogleMapsURL(latLng.lat, latLng.lng, zoom)}
            rel="noreferrer"
            target="_blank"
          >
            <Msg id="components.atoms.MapMarker.tooltip.showOnGoogleMaps" />
          </a>
        </p>
      )}
    </Popup>
  </Marker>
);
