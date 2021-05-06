import React, { CSSProperties } from 'react';
import { FC } from 'react';

interface ConcaveCornerViewProps {
  style: CSSProperties;
  horizontalDirection: 'left' | 'right';
  verticalDirection: 'up' | 'down';
  fill: string;
}

const ConcaveCornerView: FC<ConcaveCornerViewProps> = ({
  style,
  horizontalDirection,
  verticalDirection,
  fill,
}) => {
  // TODO replace this with a cheap hash
  const maskName = Math.random().toString();
  return (
    <svg viewBox="0 0 25 25" style={style}>
      <defs>
        <mask id={maskName} x="0" y="0" width="25" height="25">
          <rect x="0" y="0" width="25" height="25" fill="#fff" />
          <circle
            cx={horizontalDirection === 'left' ? '0' : '25'}
            cy={verticalDirection === 'down' ? '25' : '0'}
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
        fill={fill}
      />
    </svg>
  );
};

export default ConcaveCornerView;
