import React from 'react';
import { useSelector } from 'react-redux';
import { selectMobileShareState } from '../../../slices/app/app.slice';

const MobileShareView = () => {
  const menuOpen = useSelector(selectMobileShareState);

  return (
    <>
      {menuOpen ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 80,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          mobile share
        </div>
      ) : null}
    </>
  );
};

export default MobileShareView;
