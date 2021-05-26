import React from 'react';
import { useResponsiveWidth } from '../../../utils/responsive.util';
import LinkPreloaderView from '../link-preloader/LinkPreloader.view';

const FooterButtonView = () => {
  const isW = useResponsiveWidth();
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
          className={[
            'has-responsive-horizontal-padding-for-blocks',
            'has-responsive-vertical-padding-for-blocks',
          ].join(' ')}
          style={{
            color: 'var(--brush-white)',
            // static font size looks better for this component
            fontSize: 14,

            /**
             * This alteration in paddingLeft is to make footer button look good
             * on its own account, there is nothing around the footer at this
             * breakpoint. It should set its own style.
             */
            ...(isW.lg && {
              paddingLeft: 'calc(var(--sp) * 2)',
            }),
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
