import React from 'react';
import LinkPreloaderView from '../link-preloader/LinkPreloader.view';

const FooterButtonView = () => {
  const { pageTitle } = window.config;

  return (
    <LinkPreloaderView to="/credits">
      <div
        style={{
          width: '25vw',
          height: '25vw',
          minWidth: '7em',
          minHeight: '7em',
          boxSizing: 'border-box',
          maxHeight: 'var(--height-footer-desktop-button)',
          maxWidth: 'var(--height-footer-desktop-button)',
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
          {pageTitle.split(' ').map((word) => (
            <div style={{ color: 'var(--brush-white)' }} key={word}>
              {word}
            </div>
          ))}
        </div>
      </div>
    </LinkPreloaderView>
  );
};

export default FooterButtonView;
