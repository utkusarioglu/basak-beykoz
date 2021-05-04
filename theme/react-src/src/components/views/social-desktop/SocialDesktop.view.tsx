import React from 'react';
import { AiFillLinkedin, AiFillInstagram } from 'react-icons/ai';

const socialItems = [
  {
    title: 'Instagram',
    icon: <AiFillInstagram size="1.3em" />,
    link: 'https://www.instagram.com/basak_beykoz/',
  },
  {
    title: 'Linkedin',
    link: 'https://www.linkedin.com/in/basakbeykoz/',
    icon: <AiFillLinkedin size="1.3em" />,
  },
];

const SocialDesktopView = () => {
  return (
    <div>
      {socialItems.map(({ title, link, icon }) => (
        <a
          key={title}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title={title}
          style={{ marginLeft: '0.8em' }}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialDesktopView;
