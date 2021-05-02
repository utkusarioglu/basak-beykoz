import React from 'react';
import NavView from '../../views/nav/nav.view';
import SocialView from '../../views/social/Social.view';

const HeaderLayout = () => {
  return (
    <header style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          flexGrow: 1,
          backgroundImage:
            'url(/wp-content/uploads/inline-logo-w-color@100px.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <NavView />
      <SocialView />
    </header>
  );
};

export default HeaderLayout;
