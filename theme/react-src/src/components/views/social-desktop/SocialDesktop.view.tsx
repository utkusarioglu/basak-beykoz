import React from 'react';
import { AiFillLinkedin, AiFillInstagram } from 'react-icons/ai';
import { SOCIAL_LINKS } from '../../../config';

const SOCIAL_DESKTOP_ICON_SIZE = '1.5em';

const SocialDesktopView = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {SOCIAL_LINKS.map(({ title, link, type }) => (
        <a
          key={title}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title={title}
          style={{
            marginLeft: '0.8em',
            height: SOCIAL_DESKTOP_ICON_SIZE,
          }}
        >
          {getIcon(type, SOCIAL_DESKTOP_ICON_SIZE)}
        </a>
      ))}
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

export default SocialDesktopView;
