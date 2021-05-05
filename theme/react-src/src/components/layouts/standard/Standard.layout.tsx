import React from 'react';
import type { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { DESKTOP_MIN_WIDTH } from '../../../config';

interface StandardLayoutProps {
  title: string;
  hideThumbnail?: boolean;
  hideTitle?: boolean;
  thumbnailUrl?: string;
  sideMargins?: boolean;
}

const StandardLayout: FC<StandardLayoutProps> = ({
  title,
  children,
  hideThumbnail,
  thumbnailUrl,
  hideTitle,
  sideMargins = true,
}) => {
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });

  return (
    <>
      {!hideThumbnail && (
        <div
          style={
            isDesktop
              ? {
                  position: 'fixed',
                  left: 0,
                  bottom: 0,
                  // top: 'var(--height-desktop-menu)',
                  top: 0,
                  width: '25vw',
                }
              : {
                  position: 'relative',
                  width: '100%',
                  height: '40vh',
                }
          }
        >
          <div
            style={{
              background: `var(--brush-lightGreen) url(${thumbnailUrl}) no-repeat center center`,
              backgroundSize: 'cover', // FIXME  there seems to be a react issue with this
              filter: 'sepia(50%) opacity(.5)',
              width: '100%',
              height: '100%',
            }}
          ></div>

          {!hideTitle && !isDesktop && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                textAlign: 'center',
                width: '100%',
              }}
            >
              <h2
                style={{
                  paddingLeft: 'var(--spacing)',
                  paddingRight: 'var(--spacing)',
                }}
              >
                {title}
              </h2>
            </div>
          )}
        </div>
      )}

      <div
        style={
          !hideThumbnail && isDesktop
            ? {
                marginLeft: '35vw',
                marginRight: '10vw',
                paddingTop: 'var(--height-desktop-menu)',
                marginBottom: 150,
              }
            : {
                marginTop: 'var(--spacing)',
                marginLeft: horizontalMargins(sideMargins, isDesktop),
                marginRight: horizontalMargins(sideMargins, isDesktop),
                marginBottom: 100,
              }
        }
      >
        {isDesktop && !hideTitle && (
          <h2 style={{ marginBottom: '2em' }}>{title}</h2>
        )}
        {children}
      </div>
    </>
  );
};

function horizontalMargins(sideMargins: boolean, isDesktop: boolean) {
  return !sideMargins ? 0 : !isDesktop ? 'var(--spacing)' : '5vw';
}

export default StandardLayout;
