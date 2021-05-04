import React, { CSSProperties } from 'react';
import { FC } from 'react';
import { LOADER_BG_COLOR } from '../loader-edge/LoaderEdge.view';

interface ConcaveCornerViewProps {
  style: CSSProperties;
  horizontalDirection: 'left' | 'right';
}

const ConcaveCornerView: FC<ConcaveCornerViewProps> = ({
  style,
  horizontalDirection,
}) => {
  // TODO replace this with a cheap hash
  const maskName = Math.random().toString();
  return (
    <svg viewBox="0 0 25 25" style={style}>
      <defs>
        <mask id={maskName} x="0" y="0" width="25" height="25">
          <rect x="0" y="0" width="25" height="25" fill="#fff" />
          <circle
            cx={horizontalDirection === 'left' ? '25' : '0'}
            cy="25"
            r="25"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="25"
        height="25"
        mask={`url(#${maskName})`}
        fill={LOADER_BG_COLOR}
      />
    </svg>
  );
};

export default ConcaveCornerView;
