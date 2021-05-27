import React from 'react';
import type { FC } from 'react';
import ShareListView from '../share-list/ShareList.view';
import { useMediaQuery } from 'react-responsive';
import { W_XL, MOBILE_MENU_PADDING } from '../../../config';

interface ShareDesktopContainerViewProps {
  position: 'fixed' | 'page-bottom';
}

const ShareDesktopContainerView: FC<ShareDesktopContainerViewProps> = ({
  position,
}) => {
  const isWXl = useMediaQuery({ minWidth: W_XL });

  return (
    <div
      className="has-responsive-border-radius"
      style={{
        left: 'var(--w-lg-hero-horizontal-padding)',
        // this pushes the div to the left enough to align the first icon with
        // the header logo
        marginLeft: `calc(${MOBILE_MENU_PADDING.horizontal} * -1)`,
        zIndex: 1,

        ...(position === 'fixed' && {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'var(--brush-white-half)',
          position: 'fixed',
          bottom: 'calc(var(--sp) * 2)',
        }),

        ...(position === 'page-bottom' && {
          position: 'absolute',
          bottom: 0,
        }),

        ...(isWXl && {
          left: 'var(--w-xl-hero-horizontal-padding)',
        }),
      }}
    >
      <ShareListView showTitle={false} iconSize={38} />
    </div>
  );
};

export default ShareDesktopContainerView;
