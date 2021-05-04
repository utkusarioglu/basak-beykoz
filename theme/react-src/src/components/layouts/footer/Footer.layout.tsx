import React from 'react';
import FooterButtonView from '../../views/footer-button/FooterButton.view';
import { ReactComponent as FooterArtBg } from '../../../static/footer-art-bg.svg';
import { ReactComponent as FooterArtFg } from '../../../static/footer-art-fg.svg';

const FooterLayout = () => {
  return (
    <footer
      style={{
        height: 'calc(var(--height-footer) + var(--height-menu)',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--height-footer)',
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
            right: '5vw',
          }}
        />
      </div>
    </footer>
  );
};

export default FooterLayout;
