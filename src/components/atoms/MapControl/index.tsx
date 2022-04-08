import React, { useLayoutEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  map: google.maps.Map;
  width: string;
  height: string;
  position?: google.maps.ControlPosition;
};

export const MapControl: React.FC<Props> = ({
  map,
  position = google.maps.ControlPosition.RIGHT_BOTTOM,
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

  useLayoutEffect(() => {
    const controls = map.controls[position];
    const index = controls.push(controlDiv);

    return () => {
      if (controls.getAt(index)) {
        controls.removeAt(index);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return ReactDOM.createPortal(children, controlDiv);
};
