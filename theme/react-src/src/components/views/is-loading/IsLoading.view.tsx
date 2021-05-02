import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../../slices/app/app.slice';

const IsLoadingView = () => {
  const isLoading = useSelector(selectIsLoading);
  const loadingText = 'Yüklüyor...';

  return isLoading ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        height: '20px',
        backgroundColor: '#005f35',
        opacity: 0.8,
        color: 'white',
        zIndex: 100,
        textAlign: 'center',
      }}
    >
      {loadingText}
    </div>
  ) : null;
};

export default IsLoadingView;
