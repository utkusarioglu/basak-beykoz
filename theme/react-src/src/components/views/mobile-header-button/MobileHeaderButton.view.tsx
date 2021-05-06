import React from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import ConcaveCornerView from '../concave-corner/ConcaveCorner.view';
import { MENU_DECORATION_COLOR } from '../../../config';

interface MobileHeaderButtonViewProps {
  onClick: () => void;
  selector: (state: any) => boolean;
}

const DECORATION_SIZE = 'var(--spacing)';

const MobileHeaderButtonView: FC<MobileHeaderButtonViewProps> = ({
  onClick,
  children,
  selector,
}) => {
  const selected = useSelector(selector);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {selected && (
        <ConcaveCornerView
          fill={MENU_DECORATION_COLOR}
          horizontalDirection="left"
          verticalDirection="down"
          style={{
            width: DECORATION_SIZE,
            height: DECORATION_SIZE,
            position: 'absolute',
            top: 'var(--spacing)',
            left: `calc(${DECORATION_SIZE} * -1)`,
            zIndex: 115,
          }}
        />
      )}
      <button
        onClick={onClick}
        style={{
          border: 0,
          background: selected ? MENU_DECORATION_COLOR : 'transparent',
          padding: 0,
          margin: 0,
          height: '100%',
          width: '100%',
          borderBottomLeftRadius: selected ? 'var(--spacing)' : 0,
          borderBottomRightRadius: selected ? 'var(--spacing)' : 0,
        }}
      >
        {children}
      </button>
    </div>
  );
};

export default MobileHeaderButtonView;
