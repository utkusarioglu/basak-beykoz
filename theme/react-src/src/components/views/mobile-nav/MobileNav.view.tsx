import React from 'react';
import { selectMobileNavState } from '../../../slices/app/app.slice';
import { useSelector } from 'react-redux';

const MobileNavView = () => {
  const menuOpen = useSelector(selectMobileNavState);

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
          mobile nav
        </div>
      ) : null}
    </>
  );
};

export default MobileNavView;
