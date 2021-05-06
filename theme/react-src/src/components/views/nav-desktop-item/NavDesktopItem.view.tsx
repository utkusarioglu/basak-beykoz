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
import { MENU_ITEM_HOVERED_COLOR, MENU_BORDER_RADIUS } from '../../../config';

type NavDesktopItemViewProps = WpMenuItem & { depth: number };

const MENU_ITEM_HORIZONTAL_SPACING = 'calc(var(--spacing) * 2)';
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
          <h4
            style={{
              marginTop: depth > 0 ? MENU_ITEM_VERTICAL_SPACING_DEEP : '',
              marginBottom: depth > 0 ? MENU_ITEM_VERTICAL_SPACING_DEEP : '',
              marginLeft:
                depth > 1
                  ? `calc(${MENU_ITEM_HORIZONTAL_SPACING} * ${depth})`
                  : MENU_ITEM_HORIZONTAL_SPACING,
              marginRight: MENU_ITEM_HORIZONTAL_SPACING,
            }}
          >
            {title}
          </h4>

          {isActive && (
            <Stars
              style={{
                position: 'absolute',
                top: '50%',
                left: depth === 0 ? '50%' : 40,
                height: 50,
                width: 70,
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

export default NavDesktopItemView;
