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
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 105,
            backgroundColor: MENU_BACKDROP_COLOR,
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: 'calc(var(--height-menu) - 8px)',
              left: 'var(--spacing)',
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
                marginTop: 8,
                marginBottom: 8,
                minHeight: '2em',
              }}
            >
              <div style={{ padding: 'var(--spacing)' }}>
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
