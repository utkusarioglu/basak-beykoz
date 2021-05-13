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
  hideMargins?: boolean;
  hideFooterShim?: boolean;
}

const StandardLayout: FC<StandardLayoutProps> = ({
  title,
  children,
  hideThumbnail,
  thumbnailUrl,
  hideTitle,
  hideMargins = false,
  hideFooterShim = false,
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
                backgroundSize: 'cover',
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
        style={{
          ...(!hideThumbnail && isDesktop
            ? {
                paddingTop: '10vh', // comes from heading and some whitespace creation
                marginLeft: `calc(${THUMBNAIL_WIDTH_DESKTOP} + ${VERTICAL_WHITESPACE_DESKTOP})`, // VERTICAL_WHITESPACE_DESKTOP ??
                marginRight: VERTICAL_WHITESPACE_DESKTOP, // VERTICAL_WHITESPACE_DESKTOP ??
                minHeight: 'calc(100% - 10vh)',
              }
            : {
                marginTop: 'var(--sp)',
                marginLeft: computeVerticalMargins(hideMargins, isDesktop),
                marginRight: computeVerticalMargins(hideMargins, isDesktop),
              }),

          ...(!hideFooterShim &&
            (isDesktop
              ? {
                  paddingBottom: 'var(--height-footer-shim-desktop)',
                  minHeight: 'calc(100vh + var(--height-footer-desktop))',
                }
              : {
                  paddingBottom: 'var(--height-footer-shim-mobile)',
                  /**
                   * TODO
                   * this doesn't account for the mobile browser address
                   * bar scroll behavior.
                   *
                   * It also doesn't account for the cases where the
                   * thumbnail may be turned off
                   */
                  minHeight: 'calc(40vh + var(--height-footer-mobile))',
                })),
        }}
      >
        {isDesktop && !hideTitle && (
          <h2 style={{ marginBottom: '3em', marginTop: '2em' }}>{title}</h2>
        )}
        {children}
      </div>
    </>
  );
};

/**
 * Computes the size of the vertical margins that shall be used for the
 * component
 * @param hideMargins hide margins var from the parent
 * @param isDesktop boolean indicating whether the desktop breakpoint has
 * been reached
 * @returns boolean - true to hide the vertical margins
 */
function computeVerticalMargins(hideMargins: boolean, isDesktop: boolean) {
  return hideMargins
    ? 0
    : !isDesktop
    ? 'var(--sp)'
    : VERTICAL_WHITESPACE_DESKTOP;
}

export default StandardLayout;
