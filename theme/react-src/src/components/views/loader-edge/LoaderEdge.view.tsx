import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../../slices/app/app.slice';
import ConcaveCornerView from '../concave-corner/ConcaveCorner.view';

export const LOADER_BG_COLOR = 'var(--brush-darkGreen)';
const LOADER_THICKNESS = 31;
const LOADER_Z_INDEX = 110;
const LOADER_CONCAVE_BORDER_SIZE = 'var(--spacing)';

/**
 * Displays an edge loading band
 * @returns FC
 */
const LoaderEdge = () => {
  const isLoading = useSelector(selectIsLoading);

  return isLoading ? (
    <>
      <ConcaveCornerView
        horizontalDirection="left"
        style={{
          position: 'fixed',
          top: LOADER_THICKNESS,
          left: 0,
          zIndex: LOADER_Z_INDEX,
          width: LOADER_CONCAVE_BORDER_SIZE,
          height: LOADER_CONCAVE_BORDER_SIZE,
        }}
      />

      <ConcaveCornerView
        horizontalDirection="right"
        style={{
          position: 'fixed',
          top: LOADER_THICKNESS,
          right: 0,
          zIndex: LOADER_Z_INDEX,
          width: LOADER_CONCAVE_BORDER_SIZE,
          height: LOADER_CONCAVE_BORDER_SIZE,
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          height: LOADER_THICKNESS,
          backgroundColor: LOADER_BG_COLOR,
          zIndex: LOADER_Z_INDEX,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            paddingTop: 3,
            color: 'white',
          }}
        >
          <span role="img" aria-label="loading">
            😺
          </span>
          Kedi çalışıyor
        </div>
      </div>
    </>
  ) : null;
};

export default LoaderEdge;
