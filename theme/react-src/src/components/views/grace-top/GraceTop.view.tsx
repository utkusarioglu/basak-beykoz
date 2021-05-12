import React from 'react';
import { useState, useEffect } from 'react';
import { graceTop } from '../../../utils/scroll.util';
import { GoChevronUp } from 'react-icons/go';
import { useMediaQuery } from 'react-responsive';
import { DESKTOP_MIN_WIDTH } from '../../../config';

const root = document.getElementById('root') as HTMLElement;

const GraceTopView = () => {
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });
  const [scrollPos, setScrollPos] = useState(window.scrollY);

  useEffect(() => {
    root.addEventListener('scroll', () => {
      setScrollPos(root.scrollTop);
    });
  }, []);

  if (scrollPos < window.innerHeight) {
    return null;
  }

  return (
    <button
      style={{
        position: 'fixed',
        padding: 'var(--sp) calc(var(--sp) * 2)',
        border: 'none',
        background: 'rgba(255, 192, 91, 0.6)',
        color: 'var(--brush-black)',
        backdropFilter: 'blur(5px)',
        cursor: 'pointer',
        ...(isDesktop
          ? {
              right: 'calc(17px + var(--sp) * 2)',
              bottom: 'calc(var(--sp) * 2)',
            }
          : {
              bottom: 'calc(var(--height-header-mobile) + var(--sp))',
              right: 'var(--sp)',
            }),
      }}
      onClick={graceTop}
    >
      <GoChevronUp size={20} />
    </button>
  );
};

export default GraceTopView;
