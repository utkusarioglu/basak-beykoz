import React from 'react';
import { FC } from 'react';
import { AiFillLinkedin, AiFillInstagram } from 'react-icons/ai';
import { MENU_ITEM_HOVERED_COLOR } from '../../../config';
import { useState } from 'react';
import { SOCIAL_DESKTOP_ICON_SIZE } from '../social-desktop/SocialDesktop.view';

interface SocialDesktopItemViewProps {
  title: string;
  link: string;
  type: string;
}
export const SocialDesktopItemView: FC<SocialDesktopItemViewProps> = ({
  title,
  link,
  type,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        borderRadius: 'var(--spacing)',
        backgroundColor: hovered ? MENU_ITEM_HOVERED_COLOR : 'transparent',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '1.33em', // h4 margin top
        paddingBottom: '1.33em', // h4 margin top
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        key={title}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        style={{
          marginLeft: 'var(--spacing)',
          marginRight: 'var(--spacing)',
          // height: SOCIAL_DESKTOP_ICON_SIZE,
          // ! magic number, this better aligns the icons with the nav links
          marginBottom: 1,
        }}
      >
        {getIcon(type, SOCIAL_DESKTOP_ICON_SIZE)}
      </a>
    </div>
  );
};
function getIcon(socialLinkType: string, size: string) {
  switch (socialLinkType) {
    case 'instagram':
      return <AiFillInstagram size={size} />;

    case 'linkedin':
      return <AiFillLinkedin size={size} />;

    default:
      throw new Error(`No icon set for type ${socialLinkType} for desktop`);
  }
}
