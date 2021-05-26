import React from 'react';
import type { FC } from 'react';
import { GoChevronUp } from 'react-icons/go';
import { HEADER_ICON_MOBILE_SIZE } from '../../../config';
import { useResponsiveWidth } from '../../../utils/responsive.util';

export interface GraceTopViewProps {
  onClick: () => void;
}

const GraceTopView: FC<GraceTopViewProps> = ({ onClick }) => {
  const isW = useResponsiveWidth();

  return (
    <button
      className="has-responsive-right-for-blocks"
      style={{
        position: 'fixed',
        border: 'none',
        background: 'rgba(255, 192, 91, 0.6)',
        color: 'var(--brush-black)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        borderRadius: 'var(--sp)',
        cursor: 'pointer',
        zIndex: 10,
        bottom: 'calc(var(--height-header-mobile) + var(--sp))',
        paddingTop: 'var(--sp)',
        paddingBottom: 'var(--sp)',

        // These two are aligned with the mobile header buttons
        paddingLeft: 'calc(var(--sp) * 1.5)',
        paddingRight: 'calc(var(--sp) * 1.5)',

        ...(isW.sm && {
          borderRadius: 'calc(var(--sp) * 1.5)',
        }),

        ...(isW.lg && {
          right: 'calc(var(--sp) * 2)',
          bottom: 'calc(var(--sp) * 2)',
        }),
      }}
      onClick={onClick}
    >
      <GoChevronUp size={HEADER_ICON_MOBILE_SIZE} />
    </button>
  );
};

export default GraceTopView;
