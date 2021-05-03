import React from 'react';
import type { FC } from 'react';

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
  return (
    <>
      {!hideThumbnail && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '40vh',
          }}
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
          {!hideTitle && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                textAlign: 'center',
                width: '100%',
              }}
            >
              <h2>{title}</h2>
            </div>
          )}
        </div>
      )}

      <div
        style={{
          marginLeft: sideMargins ? 'var(--spacing)' : 0,
          marginRight: sideMargins ? 'var(--spacing)' : 0,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default StandardLayout;
