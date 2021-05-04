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
import { MOBILE_MENU_PADDING } from '../../../config';
import MobileMenuSectionTitleView from '../mobile-menu-section-title/MobileMenuSectionTitleViewProps';

const iconProps = {
  size: 35,
  style: {
    borderRadius: 'var(--spacing)',
  },
};

const buttonProps = {
  style: {
    display: 'grid',
    gridTemplateColumns: `${iconProps.size}px 1fr`,
    alignItems: 'center',
    paddingRight: MOBILE_MENU_PADDING.horizontal,
    paddingLeft: MOBILE_MENU_PADDING.horizontal,
    paddingTop: MOBILE_MENU_PADDING.vertical,
    paddingBottom: MOBILE_MENU_PADDING.vertical,
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
    <div
      style={{
        // marginTop: 'calc(var(--spacing) * 2)',
        marginBottom: 'calc(var(--spacing) * 2)',
      }}
    >
      <MobileMenuSectionTitleView>
        Bu sayfayı paylaşın
      </MobileMenuSectionTitleView>
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
    </div>
  );
};

export default MobileShareView;
