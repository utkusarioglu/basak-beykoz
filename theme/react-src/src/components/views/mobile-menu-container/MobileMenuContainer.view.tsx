import React from 'react';
import type { FC } from 'react';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import MobileHeaderButtonsView from '../mobile-header-buttons/MobileHeaderButtons.view';
import {
  MENU_BG_COLOR,
  MENU_DECORATION_COLOR,
  MENU_BACKDROP_COLOR,
  MENU_VERTICAL_DECORATION_HEIGHT,
} from '../../../config';
import LoaderMobileMenuView from '../loader-mobile-menu/LoaderMobileMenu.view';
import { GrClose } from 'react-icons/gr';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryLazyView from '../error-fallback-lazy/ErrorFallbackLazy.view';

interface MobileMenuContainerViewProps {
  menuStateSelector: (state: any) => boolean;
  menuStateSetter: (state: boolean) => void;
}

const MobileMenuContainerView: FC<MobileMenuContainerViewProps> = ({
  menuStateSelector: selector,
  menuStateSetter: closer,
  children,
}) => {
  const menuOpen = useSelector(selector);

  if (!menuOpen) {
    return null;
  }

  return (
    <>
      <div
        onClick={() => closer(false)}
        style={{
          position: 'fixed',
          height: '100%',
          width: '100%',
          zIndex: 105,
          backgroundColor: MENU_BACKDROP_COLOR,
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      <button
        onClick={() => closer(false)}
        style={{
          position: 'fixed',
          top: 'var(--spacing)',
          right: 'var(--spacing)',
          backgroundColor: 'var(--brush-white)',
          borderRadius: '50%',
          border: 0,
          padding: 'var(--spacing)',
          width: 32,
          height: 32,
          zIndex: 110,
          display: 'grid', // fixes centering issues
        }}
      >
        <GrClose size={16} style={{ color: 'var(--brush-black)' }} />
      </button>

      <div
        style={{
          position: 'fixed',
          bottom: `calc(var(--height-menu) - ${MENU_VERTICAL_DECORATION_HEIGHT})`,
          minWidth: 190,
          right: 'var(--spacing)',
          borderRadius: 'var(--spacing)',
          backgroundColor: MENU_DECORATION_COLOR,
          minHeight: 50,
          zIndex: 115,
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
            <ErrorBoundary FallbackComponent={ErrorBoundaryLazyView}>
              <Suspense fallback={<LoaderMobileMenuView />}>
                {children}
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'fixed',
          bottom: 0,
          right: 0,
          height: 'var(--height-menu)',
          backgroundColor: MENU_BG_COLOR,
          zIndex: 110,
          marginRight: 'var(--spacing)',
          marginLeft: 'var(--spacing)',
          borderBottomLeftRadius: 'var(--spacing)',
          borderBottomRightRadius: 'var(--spacing)',
        }}
      >
        <MobileHeaderButtonsView />
      </div>
    </>
  );
};

export default MobileMenuContainerView;
