import React from 'react';
import { AiFillLinkedin, AiFillInstagram } from 'react-icons/ai';
import { SOCIAL_LINKS, MOBILE_MENU_PADDING } from '../../../config';

const SocialMobileView = () => {
  return (
    <ol
      style={{
        listStyle: 'none',
        marginBlockStart: 0,
        marginBlockEnd: 0,
        marginInlineStart: -4, // ! magic number
        marginInlineEnd: 0,
        paddingInlineStart: 0,
      }}
    >
      {SOCIAL_LINKS.map(({ title, link, type }) => (
        <li key={title}>
          <a
            key={title}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            style={{
              paddingLeft: MOBILE_MENU_PADDING.horizontal,
              paddingRight: MOBILE_MENU_PADDING.horizontal,
              paddingTop: MOBILE_MENU_PADDING.vertical,
              paddingBottom: MOBILE_MENU_PADDING.vertical,
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            {getIcon(type, '1.5em')}
            <div
              style={{
                marginLeft: MOBILE_MENU_PADDING.vertical,
                paddingTop: 2, // ! magic number
              }}
            >
              {title}
            </div>
          </a>
        </li>
      ))}
    </ol>
  );
};

function getIcon(socialLinkType: string, size: string) {
  switch (socialLinkType) {
    case 'instagram':
      return <AiFillInstagram size={size} />;
    case 'linkedin':
      return <AiFillLinkedin size={size} />;
    default:
      throw new Error(`No icon set for type ${socialLinkType} for mobile`);
  }
}

export default SocialMobileView;
