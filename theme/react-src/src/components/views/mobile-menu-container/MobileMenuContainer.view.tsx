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
          top: 'var(--sp)',
          right: 'var(--sp)',
          backgroundColor: 'var(--brush-white)',
          borderRadius: '50%',
          border: 0,
          padding: 'var(--sp)',
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
          bottom: `calc(var(--height-header-mobile) - ${MENU_VERTICAL_DECORATION_HEIGHT})`,
          minWidth: 190,
          maxWidth: 'calc(100vw - var(--sp) * 2)',
          right: 'var(--sp)',
          borderRadius: 'var(--sp)',
          backgroundColor: MENU_DECORATION_COLOR,
          minHeight: 50,
          zIndex: 115,
        }}
      >
        <div
          style={{
            backgroundColor: MENU_BG_COLOR,
            borderRadius: 'var(--sp)',
            marginTop: 'var(--sp)',
            marginBottom: 'var(--sp)',
            minHeight: '2em',
          }}
        >
          <div
            /**
             * This component shape is not compatible with overlay scrollbars
             * as both the size of the child and the parent are dependent
             * on each other. For this reason, the decision was made to use
             * the native scrollbars on mobile and styled scrollbars on
             * a small device with cursor support.
             *
             * The class name below is set to allow access to scss to style the
             * desktop scrollbars
             *
             * Note that the average size desktop will never have any need for
             * this component at all, as the app will switch to desktop layout
             * over 800px width
             */
            className="mobile-menu-container__content-wrapper"
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: 'calc(100vh - var(--height-header-mobile) - 150px)',
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
          height: 'var(--height-header-mobile)',
          backgroundColor: MENU_BG_COLOR,
          zIndex: 110,
          marginRight: 'var(--sp)',
          marginLeft: 'var(--sp)',
          borderBottomLeftRadius: 'var(--sp)',
          borderBottomRightRadius: 'var(--sp)',
        }}
      >
        <MobileHeaderButtonsView />
      </div>
    </>
  );
};

export default MobileMenuContainerView;
