import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../../slices/app/app.slice';

const IsLoadingView = () => {
  const isLoading = useSelector(selectIsLoading);
  // const loadingText = 'Yüklüyor...';

  return isLoading ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        height: '25px',
        backgroundColor: 'var(--brush-darkGreen)',
        // opacity: 0.8,
        color: 'white',
        zIndex: 100,
        textAlign: 'center',
        padding: 3,
      }}
    >
      <span role="img" aria-label="loading">
        😺
      </span>
      Kedi çalışıyor
    </div>
  ) : null;
};

export default IsLoadingView;
