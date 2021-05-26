import React from 'react';
import NavDesktopView from '../../views/nav-desktop/NavDesktop.view';
import SocialDesktopView from '../../views/social-desktop/SocialDesktop.view';
import { LinkPreloaderView } from '../../views/link-preloader/LinkPreloader.view';
import MobileHeaderButtonsView from '../../views/mobile-header-buttons/MobileHeaderButtons.view';
import { useSelector } from 'react-redux';
import { selectIsHeaderOpaque } from '../../../slices/app/app.slice';

const HeaderLayout = () => {
  const isOpaque = useSelector(selectIsHeaderOpaque);

  return (
    <header
      style={{
        boxSizing: 'content-box',
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
        left: 0,
        right: 0,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 100,

        ...(isWMd
          ? {
              minHeight: 'var(--height-header-desktop-min)',
              maxHeight: 'var(--height-header-desktop-max)',
              height: 'var(--height-header-desktop-responsive)',
              bottom: 'auto',
              top: 0,
              paddingRight: 'var(--header-desktop-horizontal-padding)',
              paddingLeft: 'var(--header-desktop-horizontal-padding)',
            }
          : {
              height: 'var(--height-header-mobile)',
              top: 'auto',
              bottom: 0,
              paddingRight: 'var(--sp)',
              paddingLeft: 'var(--sp)',
            }),
      }}
    >
      {
        /**
         * This div covers the back of the header when `isOpaque`
         * state is true. This happens when the scroll state of the
         * `main` scrollbar is less than 100px or so.
         *
         * This is done to make sure that the header looks clear at initial
         * moments of the app loading. Especially on small screens where the
         * hero button falls behind the header, the yellowish colors mix
         * doesn't look very appealing otherwise.
         */
        isOpaque && !isW.lg && (
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'var(--brush-white)',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: -1,
            }}
          />
        )
      }

      <LinkPreloaderView to="/">
        <div
          style={{
            backgroundImage:
              'url(/wp-content/uploads/inline-logo-w-color@100px.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPositionY: 'center',
            height: '100%',
            minWidth: 120,

            ...(isWMd
              ? {
                  maxWidth: 180,
                  width: 180,
                }
              : {
                  maxWidth: 150,
                  width: 'auto',
                }),
          }}
        />
      </LinkPreloaderView>
      <div style={{ flexGrow: 1 }}></div>

      {isWMd ? (
        <>
          <NavDesktopView />
          <SocialDesktopView />
        </>
      ) : (
        <MobileHeaderButtonsView />
      )}
    </header>
  );
};

export default HeaderLayout;
