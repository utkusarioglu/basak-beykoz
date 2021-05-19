import React from 'react';
import type { FC } from 'react';
import { GoChevronUp } from 'react-icons/go';
import { useMediaQuery } from 'react-responsive';
import {
  W_MD,
  HEADER_ICON_MOBILE_SIZE,
  HEADER_ICON_MOBILE_VERTICAL_PADDING,
} from '../../../config';

export interface GraceTopViewProps {
  onClick: () => void;
}

const GraceTopView: FC<GraceTopViewProps> = ({ onClick }) => {
  const isWMd = useMediaQuery({ minWidth: W_MD });

  return (
    <button
      style={{
        position: 'fixed',
        padding: `var(--sp) ${HEADER_ICON_MOBILE_VERTICAL_PADDING}`,
        border: 'none',
        background: 'rgba(255, 192, 91, 0.6)',
        color: 'var(--brush-black)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        borderRadius: 'var(--sp)',
        cursor: 'pointer',
        zIndex: 1,
        ...(isWMd
          ? {
              right: 'calc(17px + var(--sp) * 2)',
              bottom: 'calc(var(--sp) * 2)',
            }
          : {
              bottom: 'calc(var(--height-header-mobile) + var(--sp))',
              right: 'var(--sp)',
            }),
      }}
      onClick={onClick}
    >
      <GoChevronUp size={HEADER_ICON_MOBILE_SIZE} />
    </button>
  );
};

export default GraceTopView;
