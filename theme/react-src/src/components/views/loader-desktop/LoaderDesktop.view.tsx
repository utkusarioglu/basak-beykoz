import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../../slices/app/app.slice';
import { LoaderHtmlContentsView } from '../loader-html/LoaderHtml.view';

export const LOADER_BG_COLOR = 'var(--brush-darkGreen)';

const LOADER_SPACING = 'calc(var(--spacing) * 4) ';

/**
 * Displays an edge loading band
 * @returns FC
 */
const LoaderEdge = () => {
  const isLoading = useSelector(selectIsLoading);

  return isLoading ? (
    <div
      style={{
        position: 'fixed',
        top: `30%`,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'var(--brush-lightGreen)',
        zIndex: 100,
        borderRadius: LOADER_SPACING,
      }}
    >
      <div
        style={{
          borderRadius: LOADER_SPACING,
          marginTop: 'var(--spacing)',
          marginBottom: 'var(--spacing)',
          backgroundColor: 'var(--brush-white)',
          padding: LOADER_SPACING,
        }}
      >
        <LoaderHtmlContentsView />
      </div>
    </div>
  ) : null;
};

export default LoaderEdge;
