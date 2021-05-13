import React from 'react';
import NavDesktopView from '../../views/nav-desktop/NavDesktop.view';
import SocialDesktopView from '../../views/social-desktop/SocialDesktop.view';
import { LinkPreloaderView } from '../../views/link-preloader/LinkPreloader.view';
import MobileHeaderButtonsView from '../../views/mobile-header-buttons/MobileHeaderButtons.view';
import { useMediaQuery } from 'react-responsive';
import {
  DESKTOP_MIN_WIDTH,
  VERTICAL_WHITESPACE_DESKTOP,
} from '../../../config';

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

        top: isDesktop ? 0 : 'auto',
        bottom: isDesktop ? 'auto' : 0,
        minHeight: isDesktop
          ? 'var(--height-header-desktop-min)'
          : 'var(--height-header-mobile)',
        maxHeight: isDesktop
          ? 'var(--height-header-desktop-max)'
          : 'var(--height-header-mobile)',
        height: isDesktop
          ? 'var(--height-header-desktop-responsive)'
          : 'var(--height-header-mobile)',
        paddingRight: isDesktop ? VERTICAL_WHITESPACE_DESKTOP : 'var(--sp)',
        paddingLeft: isDesktop ? VERTICAL_WHITESPACE_DESKTOP : 'var(--sp)',
        marginRight: isDesktop ? '17px' : 0, // magic number coming from common browser scrollbar width

        backgroundColor: 'rgb(251, 251, 251, 0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 100,
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
            maxWidth: isDesktop ? 180 : 150,
            minWidth: 120,
            width: isDesktop ? '180px' : 'auto',
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
