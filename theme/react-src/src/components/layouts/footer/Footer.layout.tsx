import React from 'react';

const FooterLayout = () => {
  return (
    <footer
      style={{
        height: 'calc(var(--height-footer) + var(--height-menu)',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--height-footer)',
          backgroundColor: '#eee',
        }}
      >
        Footer
      </div>
    </footer>
  );
};

export default FooterLayout;
