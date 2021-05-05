import React from 'react';
import FooterButtonView from '../../views/footer-button/FooterButton.view';
import { ReactComponent as FooterArtBg } from '../../../static/footer-art-bg.svg';
import { ReactComponent as FooterArtFg } from '../../../static/footer-art-fg.svg';
import { useMediaQuery } from 'react-responsive';
import { DESKTOP_MIN_WIDTH } from '../../../config';

const FooterLayout = () => {
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });

  return (
    <footer
      style={{
        height: isDesktop
          ? 'var(--height-desktop-footer)'
          : 'calc(var(--height-footer) + var(--height-menu)',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: isDesktop
            ? 'calc(var(--height-desktop-footer) - var(--height-desktop-footer-button))'
            : 0,
          left: 0,
          right: 0,
          height: 'var(--height-desktop-footer-button)',
        }}
      >
        <FooterButtonView />

        <FooterArtBg
          style={{
            width: '100%',
            height: '100%',
          }}
        />

        <FooterArtFg
          style={{
            position: 'absolute',
            bottom: 0,
            maxHeight: 200,
            left: '25vw',
            right: isDesktop ? '25vw' : '5vw',
          }}
        />
      </div>
    </footer>
  );
};

export default FooterLayout;
