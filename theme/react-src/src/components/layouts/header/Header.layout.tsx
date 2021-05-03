import React from 'react';
// import NavView from '../../views/nav/nav.view';
// import SocialView from '../../views/social/Social.view';
import { SingularPreloaderLinkView } from '../../views/preloader-link/PreloaderLink.view';
import { HOME_SLUG } from '../../../config';
import { urlSlug } from '../../../utils/slug.util';
import MobileHeaderButtonsView from '../../views/mobile-header-buttons/MobileHeaderButtons.view';

const HeaderLayout = () => {
  const isMobile = true;

  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--height-menu)',
        backgroundColor: 'var(--brush-white)',
        zIndex: 100,
        paddingRight: 'var(--spacing)',
        paddingLeft: 'var(--spacing)',
      }}
    >
      <SingularPreloaderLinkView to={urlSlug(HOME_SLUG)}>
        <div
          style={{
            backgroundImage:
              'url(/wp-content/uploads/inline-logo-w-color@100px.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPositionY: 'center',
            height: '100%',
            maxWidth: 150,
            minWidth: 120,
          }}
        />
      </SingularPreloaderLinkView>
      <div style={{ flexGrow: 1 }}></div>

      {isMobile && <MobileHeaderButtonsView />}
      {/* <NavView /> */}
      {/* <SocialView /> */}
    </header>
  );
};

export default HeaderLayout;
