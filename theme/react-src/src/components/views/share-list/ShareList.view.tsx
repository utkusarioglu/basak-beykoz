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
import type { FC } from 'react';
import { selectSingular } from '../../../slices/singular/singular.slice';
import { useSelector } from 'react-redux';
import { MOBILE_MENU_PADDING } from '../../../config';
import MobileMenuSectionTitleView from '../mobile-menu-section-title/MobileMenuSectionTitleViewProps';
import { closeAllMenus } from '../../../slices/app/app.slice';

type ShareListViewProps = {
  showTitle?: boolean;
  iconSize: number;
};

const buttonStyle = {
  display: 'flex',
  flexDirection: 'row' as 'row', // fixes issue with react-share
  alignItems: 'center',
};

const horizontalStyles = {
  paddingRight: 'calc(var(--sp) * 1.5)',
};

const verticalStyles = {
  paddingRight: MOBILE_MENU_PADDING.horizontal,
  paddingLeft: MOBILE_MENU_PADDING.horizontal,
  paddingTop: MOBILE_MENU_PADDING.vertical,
  paddingBottom: MOBILE_MENU_PADDING.vertical,
};

const ShareListView: FC<ShareListViewProps> = ({
  showTitle = true,
  iconSize,
}) => {
  const { titleSeparator } = window.config;
  const url = window.location.href;
  const singular = useSelector(selectSingular);

  const title = document.title;
  const excerpt = singular.render
    ? singular.excerpt
    : `Profesyonel Koç Başak Beykoz'un internet sitesi`;

  const horizontalLayout = !showTitle;

  const common = {
    onClick: closeAllMenus,
    style: {
      ...buttonStyle,
      ...(horizontalLayout ? horizontalStyles : verticalStyles),
    },
  };

  return (
    <div
      style={{
        marginBottom: 'calc(var(--sp) * 2)',
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

          ...(horizontalLayout && {
            display: 'grid',
            gridAutoFlow: 'column',
            marginLeft: MOBILE_MENU_PADDING.horizontal,
            marginRight: 'calc(var(--sp) * 0.5)',
          }),
        }}
      >
        <li>
          <FacebookShareButton
            {...{
              url,
              quote: title,
              ...common,
            }}
          >
            <FacebookIcon
              size={iconSize}
              style={{
                borderRadius: 'var(--sp)',
                marginRight: showTitle ? 'var(--sp)' : 0,
              }}
            />
            {showTitle && <span>Facebook</span>}
          </FacebookShareButton>
        </li>

        <li>
          <TwitterShareButton
            {...{
              url,
              title,
              ...common,
            }}
          >
            <TwitterIcon
              size={iconSize}
              style={{
                borderRadius: 'var(--sp)',
                marginRight: showTitle ? 'var(--sp)' : 0,
              }}
            />
            {showTitle && <span>Twitter</span>}
          </TwitterShareButton>
        </li>

        <li>
          <WhatsappShareButton
            {...{
              url,
              title,
              separator: titleSeparator,
              ...common,
            }}
          >
            <WhatsappIcon
              size={iconSize}
              style={{
                borderRadius: 'var(--sp)',
                marginRight: showTitle ? 'var(--sp)' : 0,
              }}
            />
            {showTitle && <span>WhatsApp</span>}
          </WhatsappShareButton>
        </li>

        <li>
          <LinkedinShareButton
            {...{
              source: url,
              url,
              title,
              summary: excerpt,
              ...common,
            }}
          >
            <LinkedinIcon
              size={iconSize}
              style={{
                borderRadius: 'var(--sp)',
                marginRight: showTitle ? 'var(--sp)' : 0,
              }}
            />
            {showTitle && <span>LinkedIn</span>}
          </LinkedinShareButton>
        </li>
      </ol>
    </div>
  );
};

export default ShareListView;
