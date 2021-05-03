import React from 'react';

const FOOTER_HEIGHT = 150;

const FooterLayout = () => {
  return (
    <footer
      style={{
        height: FOOTER_HEIGHT,
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: FOOTER_HEIGHT,
          backgroundColor: '#eee',
        }}
      >
        Footer
      </div>
    </footer>
  );
};

export default FooterLayout;
