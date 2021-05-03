import React from 'react';
import type { FC } from 'react';

interface MobileHeaderButtonViewProps {
  onClick: () => void;
}

const MobileHeaderButtonView: FC<MobileHeaderButtonViewProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        border: 0,
        background: 'transparent',
      }}
    >
      {children}
    </button>
  );
};

export default MobileHeaderButtonView;
