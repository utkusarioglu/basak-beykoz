import React from 'react';
import NavView from '../../views/nav/nav.view';
import SocialView from '../../views/social/Social.view';
import { SingularPreloaderLinkView } from '../../views/preloader-link/PreloaderLink.view';
import { HOME_SLUG } from '../../../config';
import { urlSlug } from '../../../utils/slug.util';

const HeaderLayout = () => {
  return (
    <header style={{ display: 'flex', flexDirection: 'row' }}>
      <SingularPreloaderLinkView
        to={urlSlug(HOME_SLUG)}
        style={{
          flexGrow: 1,
        }}
      >
        <div
          style={{
            backgroundImage:
              'url(/wp-content/uploads/inline-logo-w-color@100px.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '100%',
          }}
        />
      </SingularPreloaderLinkView>
      <NavView />
      <SocialView />
    </header>
  );
};

export default HeaderLayout;
