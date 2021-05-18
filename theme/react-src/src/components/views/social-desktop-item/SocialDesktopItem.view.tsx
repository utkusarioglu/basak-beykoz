import React, { CSSProperties } from 'react';
import { FC } from 'react';
import { AiFillLinkedin, AiFillInstagram } from 'react-icons/ai';
import { MENU_ITEM_HOVERED_COLOR } from '../../../config';
import { useState } from 'react';
import { SOCIAL_DESKTOP_ICON_SIZE } from '../../../config';

interface SocialDesktopItemViewProps {
  title: string;
  link: string;
  type: string;
  style: CSSProperties;
}

export const SocialDesktopItemView: FC<SocialDesktopItemViewProps> = ({
  title,
  link,
  type,
  style,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
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
          ...style,
          backgroundColor: hovered ? MENU_ITEM_HOVERED_COLOR : 'transparent',
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
