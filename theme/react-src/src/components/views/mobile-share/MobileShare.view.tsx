import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';
import { selectSingular } from '../../../slices/singular/singular.slice';
import { useSelector } from 'react-redux';

const iconProps = {
  size: 40,
  style: {
    borderRadius: 'var(--spacing)',
  },
};

const buttonProps = {
  style: {
    display: 'grid',
    gridTemplateColumns: `${iconProps.size}px 1fr`,
    alignItems: 'center',
    marginTop: 'var(--spacing)',
    marginBottom: 'var(--spacing)',
    gridColumnGap: 'var(--spacing)',
  },
};

const MobileShareView = () => {
  const { titleSeparator } = window.config;
  const url = window.location.href;
  const singular = useSelector(selectSingular);

  const title = document.title;
  const excerpt = singular.render
    ? singular.excerpt
    : `Profesyonel Koç Başak Beykoz'un internet sitesi`;

  return (
    <ol
      style={{
        listStyle: 'none',
        margin: 0,
        marginBlockStart: 0,
        marginBlockEnd: 0,
        marginInlineStart: 0,
        marginInlineEnd: 0,
        paddingInlineStart: 0,
      }}
    >
      <li>
        <FacebookShareButton
          {...{
            url,
            quote: title,
            ...buttonProps,
          }}
        >
          <FacebookIcon {...iconProps} />
          Facebook
        </FacebookShareButton>
      </li>

      <li>
        <TwitterShareButton
          {...{
            url,
            title,
            ...buttonProps,
          }}
        >
          <TwitterIcon {...iconProps} />
          Twitter
        </TwitterShareButton>
      </li>

      <li>
        <WhatsappShareButton
          {...{
            url,
            title,
            separator: titleSeparator,
            ...buttonProps,
          }}
        >
          <WhatsappIcon {...iconProps} />
          WhatsApp
        </WhatsappShareButton>
      </li>

      <li>
        <LinkedinShareButton
          {...{
            source: url,
            url,
            title,
            summary: excerpt,
            ...buttonProps,
          }}
        >
          <LinkedinIcon {...iconProps} />
          LinkedIn
        </LinkedinShareButton>
      </li>
    </ol>
  );
};

export default MobileShareView;
