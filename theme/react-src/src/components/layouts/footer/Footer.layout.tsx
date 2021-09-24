import React from 'react';
import FooterButtonView from '../../views/footer-button/FooterButton.view';
import { ReactComponent as FooterArtBg } from '../../../static/footer-art-bg.svg';
import { ReactComponent as FooterArtFg } from '../../../static/footer-art-fg.svg';
import { useMediaQuery } from 'react-responsive';
import { W_LG } from '../../../config';

const FooterLayout = () => {
  const isWLg = useMediaQuery({ minWidth: W_LG });

  return (
    <footer
      style={{
        marginTop: isWLg
          ? 'calc(var(--height-footer-desktop) * -1)'
          : 'calc(var(--height-footer-mobile) * -1)',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: isWLg
            ? 'calc(var(--height-footer-desktop) - var(--height-footer-desktop-button))'
            : 0,
          left: 0,
          right: 0,
          height: 'var(--height-footer-desktop-button)',
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
            // fixes svg sizing issues with ios (70 + 25 + 5)vw = 100vw
            // The numbers come from the 3 props below.
            maxWidth: '70vw',
            right: '25vw', // reserves space for the footer-button
            // 22 is a magic number that emerges from the behavior of the svg
            // 25px is a magic number that emerges from the content of the svg
            // 25px covers the plant on the right on the smallest screens
            left: isWLg ? '22vw' : 'calc(20px + 5vw)',
            ...(isWLg && {
              // 52vw is a magic number that is a combination of 50vw for dead
              // center + 2 vw for the artistic center of the image.
              left: '52vw',
              right: 'none',
              transform: 'translateX(-50%)',
            }),
          }}
        />

        {
          /**
           * Creates a `--brush-white` colored empty space for the
           * mobile header background. This allows the mobile header to appear
           * clean, devoid of any other colors other than the background color
           * of this div.
           *
           * Refer to FOOTER.md for more details about this div
           */
          !isWLg && (
            <div
              style={{
                height: 'var(--height-header-mobile)',
                backgroundColor: 'var(--brush-white)',
              }}
            />
          )
        }
      </div>
    </footer>
  );
};

export default FooterLayout;
