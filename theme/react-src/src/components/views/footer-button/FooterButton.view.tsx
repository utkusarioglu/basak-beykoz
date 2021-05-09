import React from 'react';
import { LinkNavView } from '../link-nav/LinkNav.view';

const FooterButtonView = () => {
  const { pageTitle } = window.config;

  return (
    <LinkNavView urlfulSlug="/credits">
      <div
        style={{
          width: '25vw',
          height: '25vw',
          minWidth: '7em',
          minHeight: '7em',
          boxSizing: 'border-box',
          maxHeight: 'var(--height-desktop-footer-button)',
          maxWidth: 'var(--height-desktop-footer-button)',
          backgroundColor: 'var(--brush-black)',
          borderTopRightRadius: 'calc(var(--sp) * 3)',
          position: 'absolute',
          left: 0,
          bottom: 0,
          textAlign: 'left',
          display: 'grid',
          alignItems: 'end',
        }}
      >
        <div
          // this div fixes text placement issues with ios devices
          style={{
            color: 'var(--brush-white)',
            margin: 'var(--sp)',
          }}
        >
          ♡
          <br />
          {new Date(Date.now()).getFullYear()}
          <br />
          {pageTitle}
        </div>
      </div>
    </LinkNavView>
  );
};

export default FooterButtonView;
