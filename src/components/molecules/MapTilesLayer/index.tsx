import React from 'react';
import { useIntl } from 'react-intl';
import { LayerGroup, LayersControl, TileLayer } from 'react-leaflet';

import { msg } from 'src/i18n/Msg';

const osmAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const MapTilesLayer: React.FC = () => {
  const intl = useIntl();

  return (
    <LayersControl position="topleft">
      <LayersControl.BaseLayer
        name={msg(intl, { id: 'components.molecules.MapTilesLayer.map' })}
        checked
      >
        <TileLayer
          attribution={osmAttribution}
          maxZoom={18}
          subdomains="abc"
          tileSize={128}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zoomOffset={1}
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer
        name={msg(intl, { id: 'components.molecules.MapTilesLayer.satellite' })}
      >
        <LayerGroup>
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            maxZoom={16}
            tileSize={128}
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            zoomOffset={1}
          />
          <TileLayer
            attribution={`${osmAttribution} &copy; <a href="https://carto.com/attributions">CARTO</a>`}
            maxZoom={16}
            subdomains="abcd"
            tileSize={128}
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
            zoomOffset={1}
          />
        </LayerGroup>
      </LayersControl.BaseLayer>
    </LayersControl>
  );
};
