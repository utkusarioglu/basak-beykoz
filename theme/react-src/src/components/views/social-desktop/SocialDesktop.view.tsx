import React from 'react';
import { AiFillLinkedin, AiFillInstagram } from 'react-icons/ai';
import { SOCIAL_LINKS } from '../../../config';

const SocialDesktopView = () => {
  return (
    <div>
      {SOCIAL_LINKS.map(({ title, link, type }) => (
        <a
          key={title}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title={title}
          style={{ marginLeft: '0.8em' }}
        >
          {getIcon(type, '1.3em')}
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
