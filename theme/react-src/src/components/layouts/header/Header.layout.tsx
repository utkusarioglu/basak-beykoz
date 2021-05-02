import React from 'react';

const HeaderLayout = () => {
  return (
    <header style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          flexGrow: 1,
          backgroundImage:
            'url(/wp-content/uploads/inline-logo-w-color@100px.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    </header>
  );
};

export default HeaderLayout;
