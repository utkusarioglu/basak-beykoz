import React from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';

interface MobileHeaderButtonViewProps {
  onClick: () => void;
  selector: (state: any) => boolean;
}

const MobileHeaderButtonView: FC<MobileHeaderButtonViewProps> = ({
  onClick,
  children,
  selector,
}) => {
  const selected = useSelector(selector);

  return (
    <button
      onClick={onClick}
      style={{
        border: 0,
        background: selected ? 'var(--brush-darkYellow)' : 'transparent',
        padding: 0,
        margin: 0,
        borderBottomLeftRadius: selected ? 'var(--spacing)' : 0,
        borderBottomRightRadius: selected ? 'var(--spacing)' : 0,
      }}
    >
      {children}
    </button>
  );
};

export default MobileHeaderButtonView;
