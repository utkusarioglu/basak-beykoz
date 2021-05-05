import React from 'react';
// import PreloaderLink from '../preloader-link/PreloaderLink.view';
import { LinkNavView } from '../link-nav/LinkNav.view';

const FooterButtonView = () => {
  const { pageTitle } = window.config;

  return (
    <LinkNavView urlfulSlug="/credits">
      <div
        style={{
          width: '25vw',
          height: '25vw',
          minWidth: '6em',
          minHeight: '6em',
          boxSizing: 'border-box',
          maxHeight: 'var(--height-desktop-footer-button)',
          maxWidth: 'var(--height-desktop-footer-button)',
          backgroundColor: 'var(--brush-black)',
          borderTopRightRadius: 'calc(var(--spacing) * 3)',
          position: 'absolute',
          color: 'var(--brush-white)',
          left: 0,
          bottom: 0,
          textAlign: 'left',
          padding: 'var(--spacing)',
          display: 'grid',
          alignItems: 'end',
        }}
      >
        ♡
        <br />
        {new Date(Date.now()).getFullYear()}
        <br />
        {pageTitle}
      </div>
    </LinkNavView>
  );
};

export default FooterButtonView;
