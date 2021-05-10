import React from 'react';
import { FC } from 'react';
import { WpMenuItem } from '../../../@types/wp-types';
import { urlSlug } from '../../../utils/slug.util';
import NavMobileChildItemsView from './NavMobileChildItems.view';
import { LinkNavView } from '../link-nav/LinkNav.view';
import {
  MOBILE_MENU_PADDING as MOBILE_MENU_ITEM_SPACING,
  MENU_ITEM_ACTIVE_COLOR,
} from '../../../config';
import { useLocation } from 'react-router';
import { ReactComponent as Stars } from '../../../static/nav-desktop-stars.svg';
import { closeAllMenus } from '../../../slices/app/app.slice';

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
        marginTop: 'var(--sp)',
        position: 'relative',
      }}
    >
      <LinkNavView
        urlfulSlug={urlfulSlug}
        onSelect={closeAllMenus}
        style={{ textDecoration: 'none' }}
      >
        <div
          style={{
            width: 'max-content',
            position: 'relative',
            marginLeft: MOBILE_MENU_ITEM_SPACING.horizontal,
            marginRight: MOBILE_MENU_ITEM_SPACING.horizontal,
          }}
        >
          {isActive && <ActiveIndicatorView depth={depth} />}

          <div
            style={{
              position: 'relative',
              width: 'max-content',
              paddingTop: MOBILE_MENU_ITEM_SPACING.vertical,
              paddingBottom: MOBILE_MENU_ITEM_SPACING.vertical,
            }}
          >
            {title}
          </div>
        </div>
      </LinkNavView>

      {hasChildren && (
        <NavMobileChildItemsView children={child_items} depth={depth + 1} />
      )}
    </div>
  );
};

interface ActiveIndicatorViewProps {
  depth: number;
}

const ActiveIndicatorView: FC<ActiveIndicatorViewProps> = ({ depth }) => (
  <>
    <Stars
      style={{
        fill: MENU_ITEM_ACTIVE_COLOR,
        height: 50,
        left: 30,
        pointerEvents: 'none',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 60,
      }}
    />
    <div
      style={{
        backgroundColor: MENU_ITEM_ACTIVE_COLOR,
        borderRadius: '50%',
        height: '4px',
        position: 'absolute',
        top: `calc(50% + 0.9em /2)`,
        width: '100%',
      }}
    />
  </>
);

export default NavMobileItemView;
