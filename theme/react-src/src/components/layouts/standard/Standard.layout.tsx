import React from 'react';
import type { FC } from 'react';

interface StandardLayoutProps {
  title: string;
  hideThumbnail?: boolean;
  hideTitle?: boolean;
  thumbnailUrl?: string;
}
const THUMBNAIL_MD_WIDTH = '30%';

const StandardLayout: FC<StandardLayoutProps> = ({
  title,
  children,
  hideThumbnail,
  thumbnailUrl,
  hideTitle,
}) => {
  return (
    <>
      {!hideThumbnail && (
        <div
          style={{
            background: thumbnailUrl ? `url(${thumbnailUrl})` : '#ddd',
            width: 100,
            height: 100,
          }}
        ></div>
      )}

      <div>
        {!hideTitle && <h2>{title}</h2>}
        {children}
      </div>
    </>
  );
};

export default StandardLayout;
