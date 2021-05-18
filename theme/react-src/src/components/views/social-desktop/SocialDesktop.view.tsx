import React from 'react';
import { SOCIAL_LINKS } from '../../../config';
import { SocialDesktopItemView } from '../social-desktop-item/SocialDesktopItem.view';

const itemStyle = {
  display: 'grid',
  borderRadius: 'var(--sp)',
  overflow: 'hidden',
  alignItems: 'center',
  justifyItems: 'center',
  height: '100%',
  width: '100%',
  paddingLeft: 'var(--sp)',
  paddingRight: 'var(--sp)',
  textDecoration: 'none',
};

const SocialDesktopView = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 'calc(var(--sp) * -1)',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      {SOCIAL_LINKS.map((item) => (
        <SocialDesktopItemView {...item} style={itemStyle} key={item.type} />
      ))}
    </div>
  );
};

export default SocialDesktopView;
