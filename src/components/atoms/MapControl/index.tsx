import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  map: google.maps.Map;
  width: string;
  height: string;
  position: google.maps.ControlPosition;
};

export const MapControl: React.FC<Props> = ({
  map,
  position,
  width,
  height,
  children,
}) => {
  const controlDiv = useMemo(() => {
    const div = document.createElement('div');

    div.style.width = width;
    div.style.height = height;

    return div;
  }, [width, height]);

  useEffect(() => {
    const controls = map.controls[position];
    const index = controls.push(controlDiv);

    return () => {
      controls.removeAt(index);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return ReactDOM.createPortal(children, controlDiv);
};
