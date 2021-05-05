import React from 'react';
import NavDesktopView from '../../views/nav-desktop/NavDesktop.view';
import SocialDesktopView from '../../views/social-desktop/SocialDesktop.view';
import { LinkPreloaderSingularView } from '../../views/link-preloader/LinkPreloader.view';
import { HOME_SLUG } from '../../../config';
import { urlSlug } from '../../../utils/slug.util';
import MobileHeaderButtonsView from '../../views/mobile-header-buttons/MobileHeaderButtons.view';
import { useMediaQuery } from 'react-responsive';
import { DESKTOP_MIN_WIDTH } from '../../../config';

const HeaderLayout = () => {
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });

  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
        top: isDesktop ? 0 : 'auto',
        bottom: isDesktop ? 'auto' : 0,
        left: 0,
        right: 0,
        height: isDesktop ? 'var(--height-desktop-menu)' : 'var(--height-menu)',
        backgroundColor: 'rgb(251, 251, 251, 0.5)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        paddingRight: isDesktop ? '5vw' : 'var(--spacing)',
        paddingLeft: isDesktop ? '5vw' : 'var(--spacing)',
      }}
    >
      <LinkPreloaderSingularView to={urlSlug(HOME_SLUG)}>
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
      </LinkPreloaderSingularView>
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
