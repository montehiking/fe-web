import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { MapState } from 'src/types';

type Provider = 'mapsme' | 'organicmaps';

const xml = '<?xml version="1.0" encoding="UTF-8"?>';

const providerToDomain: Record<Provider, string> = {
  mapsme: 'maps.me',
  organicmaps: 'omaps.app',
};

export const renderFile = (
  provider: 'mapsme' | 'organicmaps',
  mapState: MapState
): string => {
  const backup = console.error;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any[]) => {
    if (args[0].includes('Use PascalCase')) {
      return;
    }
    backup.call(console, ...args);
  };

  const placemarkStyles = ['placemark-red', 'placemark-yellow'].map((id) =>
    createElement('Style', {
      id,
      key: id,
      children: createElement('IconStyle', {
        children: createElement('Icon', {
          children: createElement('href', {
            children: `https://${providerToDomain[provider]}/placemarks/${id}.png`,
          }),
        }),
      }),
    })
  );

  const lineStyles = [
    // KML colors
    { id: 'line-blue', color: 'ffff9018' },
    { id: 'line-yellow', color: 'ff00ccff' },
  ].map(({ id, color }) =>
    createElement('Style', {
      id,
      key: id,
      children: createElement('LineStyle', {
        children: [
          createElement('color', { children: color }),
          createElement('width', { children: 4 }),
        ],
      }),
    })
  );

  const name = createElement('name', { children: 'MonteHiking' });
  const visibility = createElement('visibility', { children: '1' });

  const extendedData = createElement('ExtendedData', {
    'xmlns:mwm': `https://${providerToDomain[provider]}`,
    children: [
      createElement('mwm:name', {
        children: createElement('mwm:lang', {
          code: 'default',
          children: 'MonteHiking',
        }),
      }),
      createElement('mwm:annotation'),
      createElement('mwm:description'),
      createElement('mwm:lastModified', { children: new Date().toISOString() }),
      createElement('mwm:accessRules', { children: 'Local' }),
    ],
  });

  const points = mapState.points.map(({ geometry, properties }) => {
    const coordinates = geometry.coordinates.join();
    const style = properties.notVerified ? 'placemark-yellow' : 'placemark-red';

    return createElement('Placemark', {
      key: coordinates,
      children: [
        createElement('name', { children: properties.name }),
        createElement('description', {
          children: properties.description,
        }),
        createElement('styleUrl', { children: `#${style}` }),
        createElement('Point', {
          children: createElement('coordinates', { children: coordinates }),
        }),
      ],
    });
  });

  const routes = mapState.routes.map(({ geometry, properties }) => {
    const style = properties.notVerified ? 'line-yellow' : 'line-blue';

    return createElement('Placemark', {
      key: geometry.coordinates[0].join() + properties.name,
      children: [
        createElement('name', { children: properties.name }),
        createElement('description', {
          children: properties.description,
        }),
        createElement('styleUrl', { children: `#${style}` }),
        createElement('LineString', {
          children: [
            createElement('tessellate', { children: 1 }),
            createElement('coordinates', {
              children: geometry.coordinates
                .map((coords) => coords.join())
                .join(' '),
            }),
          ],
        }),
      ],
    });
  });

  const xmlDoc = createElement('kml', {
    xmlns: 'http://earth.google.com/kml/2.2',
    children: createElement('Document', {
      children: [
        ...placemarkStyles,
        ...lineStyles,
        name,
        visibility,
        extendedData,
        points,
        routes,
      ],
    }),
  });

  const result = renderToStaticMarkup(xmlDoc);

  console.error = backup;

  return xml + result;
};
