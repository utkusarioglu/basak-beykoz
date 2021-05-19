import React from 'react';
import NavDesktopView from '../../views/nav-desktop/NavDesktop.view';
import SocialDesktopView from '../../views/social-desktop/SocialDesktop.view';
import { LinkPreloaderView } from '../../views/link-preloader/LinkPreloader.view';
import MobileHeaderButtonsView from '../../views/mobile-header-buttons/MobileHeaderButtons.view';
import { useMediaQuery } from 'react-responsive';
import { DESKTOP_MIN_WIDTH } from '../../../config';

const HeaderLayout = () => {
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });

  return (
    <header
      style={{
        boxSizing: 'content-box',
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
        left: 0,
        right: 0,
        backgroundColor: 'rgb(251, 251, 251, 0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 100,

        ...(isDesktop
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

            ...(isDesktop
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

      {isDesktop ? (
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
