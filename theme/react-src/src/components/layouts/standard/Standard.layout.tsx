import React from 'react';
import type { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  DESKTOP_MIN_WIDTH,
  VERTICAL_WHITESPACE_DESKTOP,
} from '../../../config';

const THUMBNAIL_WIDTH_DESKTOP = '30vw';

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
                  top: 0,
                  width: THUMBNAIL_WIDTH_DESKTOP,
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
              backgroundColor: 'var(--brush-green-light)',
              ...(thumbnailUrl && {
                backgroundImage: `url(${thumbnailUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: 'center',
                backgroundPositionY: 'center',
                backgroundSize: 'cover', // FIXME  there seems to be a react issue with this
                filter: 'sepia(50%) opacity(.5)',
              }),
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          />
          {!isDesktop && (
            <div
              style={{
                width: '100%',
                height: 16,
                backgroundColor: 'var(--brush-white)',
                position: 'absolute',
                bottom: -8,
                borderRadius: 8,
              }}
            />
          )}

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
                  paddingLeft: 'var(--sp)',
                  paddingRight: 'var(--sp)',
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
                marginLeft: `calc(${THUMBNAIL_WIDTH_DESKTOP} + ${VERTICAL_WHITESPACE_DESKTOP})`, // VERTICAL_WHITESPACE_DESKTOP ??
                marginRight: VERTICAL_WHITESPACE_DESKTOP, // VERTICAL_WHITESPACE_DESKTOP ??
                paddingTop: '12vh', // comes from heading and some whitespace creation
              }
            : {
                marginTop: 'var(--sp)',
                marginLeft: verticalWhitespace(sideMargins, isDesktop),
                marginRight: verticalWhitespace(sideMargins, isDesktop),
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

function verticalWhitespace(sideMargins: boolean, isDesktop: boolean) {
  return !sideMargins
    ? 0
    : !isDesktop
    ? 'var(--sp)'
    : VERTICAL_WHITESPACE_DESKTOP;
}

export default StandardLayout;
