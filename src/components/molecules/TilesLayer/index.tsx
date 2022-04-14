import React from 'react';
import { LayerGroup, LayersControl, TileLayer } from 'react-leaflet';

type Tile = {
  attribution: string;
  maxZoom: number;
  subdomains?: string;
  url: string;
};

type Layer = {
  name: string;
  tiles: Tile[];
};

const osmAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const layers: Layer[] = [
  {
    name: 'Карта',
    tiles: [
      {
        attribution: osmAttribution,
        maxZoom: 18,
        subdomains: 'abc',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      },
    ],
  },
  {
    name: 'Спутник',
    tiles: [
      {
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 16,
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      },
      {
        attribution: `${osmAttribution} &copy; <a href="https://carto.com/attributions">CARTO</a>`,
        maxZoom: 16,
        subdomains: 'abcd',
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
      },
    ],
  },
];

export const TilesLayer: React.FC = () => (
  <LayersControl position="topleft">
    {layers.map(({ name, tiles }, i) => (
      <LayersControl.BaseLayer key={name} name={name} checked={i === 0}>
        <LayerGroup>
          {tiles.map((options) => (
            <TileLayer
              key={options.url}
              tileSize={128}
              zoomOffset={1}
              {...options}
            />
          ))}
        </LayerGroup>
      </LayersControl.BaseLayer>
    ))}
  </LayersControl>
);
