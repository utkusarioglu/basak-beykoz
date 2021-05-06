import React from 'react';
import type { FC } from 'react';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import MobileHeaderButtonsView from '../mobile-header-buttons/MobileHeaderButtons.view';
import {
  MENU_BG_COLOR,
  MENU_DECORATION_COLOR,
  MENU_BACKDROP_COLOR,
} from '../../../config';
import LoaderMobileMenuView from '../loader-mobile-menu/LoaderMobileMenu.view';
import { GrClose } from 'react-icons/gr';

interface MobileMenuContainerViewProps {
  selector: (state: any) => boolean;
  closer: (state: boolean) => void;
}

const MobileMenuContainerView: FC<MobileMenuContainerViewProps> = ({
  selector,
  closer,
  children,
}) => {
  const menuOpen = useSelector(selector);

  return (
    <>
      {menuOpen ? (
        <div
          onClick={() => closer(false)}
          style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            zIndex: 105,
            backdropFilter: 'blur(4px)',
            backgroundColor: MENU_BACKDROP_COLOR,
          }}
        >
          <button
            style={{
              position: 'fixed',
              top: 'var(--spacing)',
              right: 'var(--spacing)',
              backgroundColor: 'var(--brush-white)',
              borderRadius: '50%',
              border: 0,
              padding: 'var(--spacing)',
              width: 31,
              height: 31,
            }}
          >
            <GrClose size={15} style={{ color: 'var(--brush-black)' }} />
          </button>
          <div
            style={{
              position: 'absolute',
              bottom: 'calc(var(--height-menu) - 8px)',
              minWidth: 200,
              right: 'var(--spacing)',
              borderRadius: 'var(--spacing)',
              backgroundColor: MENU_DECORATION_COLOR,
              minHeight: 50,
              zIndex: 110,
            }}
          >
            <div
              style={{
                backgroundColor: MENU_BG_COLOR,
                borderRadius: 'var(--spacing)',
                marginTop: 'var(--spacing)',
                marginBottom: 'var(--spacing)',
                minHeight: '2em',
              }}
            >
              <div
                style={{
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  maxHeight: 'calc(100vh - var(--height-menu) - 150px)',
                }}
              >
                <Suspense fallback={<LoaderMobileMenuView />}>
                  {children}
                </Suspense>
              </div>
            </div>
          </div>
          <div
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row',
              position: 'fixed',
              bottom: 0,
              right: 0,
              height: 'var(--height-menu)',
              backgroundColor: MENU_BG_COLOR,
              zIndex: 105,
              marginRight: 'var(--spacing)',
              marginLeft: 'var(--spacing)',
              borderBottomLeftRadius: 'var(--spacing)',
              borderBottomRightRadius: 'var(--spacing)',
            }}
          >
            <MobileHeaderButtonsView />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileMenuContainerView;
