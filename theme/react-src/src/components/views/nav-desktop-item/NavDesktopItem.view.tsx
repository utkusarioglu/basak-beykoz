import React from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { WpMenuItem } from '../../../@types/wp-types';
import { urlSlug } from '../../../utils/slug.util';
import NavDesktopChildItemsView from './NavDesktopChildItems.view';
import { LinkNavView } from '../link-nav/LinkNav.view';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Stars } from '../../../static/nav-desktop-stars.svg';
import ConcaveCornerView from '../concave-corner/ConcaveCorner.view';
import {
  MENU_ITEM_HOVERED_COLOR,
  MENU_BORDER_RADIUS,
  MENU_ITEM_ACTIVE_COLOR,
} from '../../../config';

type NavDesktopItemViewProps = WpMenuItem & { depth: number };

const DESKTOP_MENU_ITEM_HORIZONTAL_SPACING = 'calc(var(--spacing) * 2)';
const MENU_ITEM_VERTICAL_SPACING_DEEP = 'calc(var(--spacing) * 1.5)';

export const NavDesktopItemView: FC<NavDesktopItemViewProps> = ({
  title,
  slug,
  child_items,
  depth,
}) => {
  const urlfulSlug = urlSlug(slug);
  const location = useLocation();
  let [hovered, setHovered] = useState(false);
  const hasChildren = child_items && child_items.length > 0;
  const isActive = urlfulSlug === location.pathname;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          backgroundColor: hovered ? MENU_ITEM_HOVERED_COLOR : 'transparent',
          borderTopLeftRadius: MENU_BORDER_RADIUS,
          borderTopRightRadius: MENU_BORDER_RADIUS,
          borderBottomRightRadius: hasChildren ? 0 : MENU_BORDER_RADIUS,
          borderBottomLeftRadius: hasChildren ? 0 : MENU_BORDER_RADIUS,
        }}
      >
        <LinkNavView urlfulSlug={urlfulSlug}>
          <div
            style={{
              width: 'max-content',
              position: 'relative',
              marginLeft:
                depth > 1
                  ? `calc(${DESKTOP_MENU_ITEM_HORIZONTAL_SPACING} * ${depth})`
                  : DESKTOP_MENU_ITEM_HORIZONTAL_SPACING,
              marginRight: DESKTOP_MENU_ITEM_HORIZONTAL_SPACING,
            }}
          >
            {isActive && <ActiveIndicatorView depth={depth} />}

            <h4
              style={{
                position: 'relative',
                marginTop: depth > 0 ? MENU_ITEM_VERTICAL_SPACING_DEEP : '',
                marginBottom: depth > 0 ? MENU_ITEM_VERTICAL_SPACING_DEEP : '',
              }}
            >
              {title}
            </h4>
          </div>

          {hovered && hasChildren && (
            <ConcaveCornerView
              fill={MENU_ITEM_HOVERED_COLOR}
              horizontalDirection="right"
              verticalDirection="up"
              style={{
                position: 'absolute',
                bottom: 0,
                right: `calc(${MENU_BORDER_RADIUS} * -1)`,
                height: MENU_BORDER_RADIUS,
              }}
            />
          )}
        </LinkNavView>
      </div>

      {hovered && hasChildren && (
        <NavDesktopChildItemsView children={child_items} depth={depth + 1} />
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
        height: 60,
        left: depth === 0 ? '50%' : 40,
        pointerEvents: 'none',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 80,
      }}
    />
    <div
      style={{
        backgroundColor: MENU_ITEM_ACTIVE_COLOR,
        borderRadius: '50%',
        height: '4px',
        position: 'absolute',
        top: `calc(50% + 1em /2)`,
        width: '100%',
      }}
    />
  </>
);

export default NavDesktopItemView;
