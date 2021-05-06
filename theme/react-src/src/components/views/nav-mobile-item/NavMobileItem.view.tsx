import React from 'react';
import { FC } from 'react';
import { WpMenuItem } from '../../../@types/wp-types';
import { urlSlug } from '../../../utils/slug.util';
import NavMobileChildItemsView from './NavMobileChildItems.view';
import { LinkNavView } from '../link-nav/LinkNav.view';
import { MOBILE_MENU_PADDING } from '../../../config';
import { useLocation } from 'react-router';
import { ReactComponent as Stars } from '../../../static/nav-desktop-stars.svg';

type NavMobileItemViewProps = WpMenuItem & { depth: number };

const NavMobileItemView: FC<NavMobileItemViewProps> = ({
  title,
  slug,
  child_items,
  depth,
}) => {
  const urlfulSlug = urlSlug(slug);
  const location = useLocation();
  const hasChildren = child_items && child_items.length > 0;
  const isActive = urlfulSlug === location.pathname;

  return (
    <div
      style={{
        marginTop: 'var(--spacing)',
        position: 'relative',
      }}
    >
      <LinkNavView urlfulSlug={urlfulSlug}>
        <div
          style={{
            marginLeft: MOBILE_MENU_PADDING.horizontal,
            marginRight: MOBILE_MENU_PADDING.horizontal,
            paddingTop: MOBILE_MENU_PADDING.vertical,
            paddingBottom: MOBILE_MENU_PADDING.vertical,
          }}
        >
          {title}
        </div>
      </LinkNavView>

      {isActive && (
        <Stars
          style={{
            position: 'absolute',
            top: '50%',
            left: 30,
            height: 40,
            width: 50,
            color: 'red',
            stroke: 'pink',
            fill: 'var(--brush-darkYellow)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            opacity: 0.6,
            // zIndex: -1,
          }}
        />
      )}

      {hasChildren && (
        <NavMobileChildItemsView children={child_items} depth={depth + 1} />
      )}
    </div>
  );
};

export default NavMobileItemView;
