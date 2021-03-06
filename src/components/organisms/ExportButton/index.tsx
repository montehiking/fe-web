import { DownloadOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import React from 'react';

import { Button } from 'src/components/atoms/Button';
import { renderFile } from 'src/components/organisms/ExportButton/kml';
import { Msg } from 'src/i18n/Msg';
import { MapState } from 'src/types';

import styles from 'src/components/organisms/ExportButton/styles.module.css';

type Props = {
  mapState: MapState;
};

const buttonProps = {
  icon: <DownloadOutlined />,
  type: 'primary',
  style: { minWidth: 110, margin: 5 },
} as const;

const ExportButton: React.FC<Props> = ({ mapState }) => {
  const disabled = mapState.routes.length + mapState.points.length === 0;

  const exportKMZ = () => {
    const zip = new JSZip();

    zip
      .file('MonteHiking.kml', renderFile('mapsme', mapState))
      .generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 9 },
      })
      .then((content) => saveAs(content, 'MonteHiking.kmz'));
  };

  const exportGeoJson = () => {
    const data = {
      type: 'FeatureCollection',
      name: 'MonteHiking',
      features: [...mapState.routes, ...mapState.points].map((item) => ({
        ...item,
        properties: {
          name: item.properties.name,
          description: item.properties.description,
          ...(item.properties.category === 'routes'
            ? { stroke: item.properties.notVerified ? 'yellow' : 'blue' }
            : { fill: item.properties.notVerified ? 'yellow' : 'red' }),
        },
      })),
    };

    const content = new Blob([JSON.stringify(data)], {
      type: 'text/json;charset=utf-8',
    });

    saveAs(content, 'MonteHiking.geojson');
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.p}>
        <Msg id="components.organisms.ExportButton.text" />
      </p>

      <div className={styles.buttons}>
        <Button
          {...buttonProps}
          disabled={disabled}
          onClick={exportGeoJson}
          text={{ id: 'components.organisms.ExportButton.geojson' }}
        />
        <Button
          {...buttonProps}
          disabled={disabled}
          onClick={exportKMZ}
          text={{ id: 'components.organisms.ExportButton.kmz' }}
        />
      </div>
    </div>
  );
};

export default ExportButton;
