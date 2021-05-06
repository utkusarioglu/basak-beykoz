import React from 'react';
import { SOCIAL_LINKS } from '../../../config';
import { SocialDesktopItemView } from '../social-desktop-item/SocialDesktopItem.view';

export const SOCIAL_DESKTOP_ICON_SIZE = '1.5em';

const SocialDesktopView = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 'calc(var(--spacing) * -1)',
      }}
    >
      {SOCIAL_LINKS.map((item) => (
        <SocialDesktopItemView {...item} />
      ))}
    </div>
  );
};

export default SocialDesktopView;
