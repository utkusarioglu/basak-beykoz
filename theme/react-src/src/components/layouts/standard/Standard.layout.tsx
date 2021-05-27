import React from 'react';
import type { FC } from 'react';
import { useResponsiveWidth } from '../../../utils/responsive.util';
import ShareDesktopContainer from '../../views/share-desktop-container/ShareDesktopContainer.view';

const THUMBNAIL_WIDTH_DESKTOP = '30vw';

interface StandardLayoutProps {
  title: string;
  hideThumbnail?: boolean;
  hideTitle?: boolean;
  thumbnailUrl?: string;
  hideMargins?: boolean;
  hideFooterShim?: boolean;
  hideHeaderShim?: boolean;
}

const StandardLayout: FC<StandardLayoutProps> = ({
  title,
  children,
  hideThumbnail,
  thumbnailUrl,
  hideTitle,
  hideMargins = false,
  hideFooterShim = false,
  hideHeaderShim = false,
}) => {
  const isW = useResponsiveWidth();

  return (
    <>
      {
        /**
         * The thumbnail block
         */
        !hideThumbnail && (
          <div
            style={{
              ...(!isW.md && {
                position: 'relative',
                width: '100%',
                height: '40vh',
              }),

              ...(isW.md && {
                position: 'fixed',
                left: 0,
                bottom: 0,
                top: 0,
                width: THUMBNAIL_WIDTH_DESKTOP,
              }),
            }}
          >
            <div
              style={{
                /**
                 * This styling arrangement ensures that this section
                 * doesn't have any filters applied if there is no image
                 * to show.
                 */
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

            {
              /**
               * renders a decoration div that makes the edges of the
               * thumbnail curved. This has an analogue in css through a
               * mixin called `section-top-decoration`
               */
              !isW.md && (
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
              )
            }

            {!hideTitle && !isW.md && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                <h1
                  style={{
                    paddingLeft: 'var(--sp)',
                    paddingRight: 'var(--sp)',
                    /**
                     * the client plans to use very long page titles h1
                     * is way too big for small mobile screens this sizing
                     * makes h1 be the same size as h2 the distinction in
                     * title hierarchy of h1 and h2 is made through the placement
                     * of h1 over the page thumbnail
                     */
                    fontSize: '1.5em',
                  }}
                >
                  {title}
                </h1>
              </div>
            )}
          </div>
        )
      }

      <div
        style={{
          ...(!hideThumbnail &&
            isW.md && {
              marginLeft: THUMBNAIL_WIDTH_DESKTOP,
            }),
        }}
      >
        <div
          className={
            !hideMargins ? 'has-responsive-horizontal-padding-for-hero' : ''
          }
          style={{
            /**
             * Needed for proper placement of the share component
             * when the thumbnail is hidden
             */
            position: 'relative',

            ...(!hideThumbnail && {
              marginTop: 'var(--sp)',

              ...(isW.md && {
                marginTop: 0, // undo small screen margin
                minHeight: 'calc(100% - 10vh)',
              }),
            }),

            ...(!hideFooterShim && {
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

              ...(isW.md && {
                paddingBottom: 'var(--height-footer-shim-desktop)',
                minHeight: 'calc(100vh + var(--height-footer-desktop))',
              }),
            }),
          }}
        >
          {
            /**
             * The large screen header has a variable size.
             */
            !hideHeaderShim && isW.lg && (
              <div
                style={{
                  minHeight: 'var(--height-header-desktop-min)',
                  maxHeight: 'var(--height-header-desktop-max)',
                  height: 'var(--height-header-desktop-responsive)',
                  width: '100%',
                }}
              />
            )
          }
          {isW.md && !hideTitle && (
            <h1 style={{ marginBottom: '2.5em', marginTop: '2em' }}>{title}</h1>
          )}
          {children}
          {
            /**
             * share component appears below the child content if there is no
             * thumbnail column
             */
            hideThumbnail && isW.lg && (
              <ShareDesktopContainer position="page-bottom" />
            )
          }
        </div>
      </div>

      {
        /**
         * Share is placed here to make sure that it's z-index works as expected.
         * This component only appears if the thumbnail column is enabled.
         */
        isW.lg && !hideThumbnail && <ShareDesktopContainer position="fixed" />
      }
    </>
  );
};

export default StandardLayout;
