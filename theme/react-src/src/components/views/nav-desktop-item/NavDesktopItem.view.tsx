import React from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { WpMenuItem } from '../../../@types/wp-types';
import { urlSlug } from '../../../utils/slug.util';
import NavDesktopChildItemsView from './NavDesktopChildItems.view';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Stars } from '../../../static/nav-desktop-stars.svg';
import ConcaveCornerView from '../concave-corner/ConcaveCorner.view';
import {
  MENU_ITEM_HOVERED_COLOR,
  MENU_BORDER_RADIUS,
  MENU_ITEM_ACTIVE_COLOR,
} from '../../../config';
import LinkPreloaderView from '../link-preloader/LinkPreloader.view';

type NavDesktopItemViewProps = WpMenuItem & { depth: number };

const DESKTOP_MENU_ITEM_HORIZONTAL_SPACING = 'calc(var(--sp) * 2)';
const MENU_ITEM_VERTICAL_SPACING_DEEP = 'calc(var(--sp) * 1.5)';

export const NavDesktopItemView: FC<NavDesktopItemViewProps> = ({
  title,
  slug,
  child_items,
  depth,
}) => {
  const urlfulSlug = urlSlug(slug);
  const location = useLocation();
  const [hovered, setHovered] = useState(false);
  const hasChildren = child_items && child_items.length > 0;
  const isActive = urlfulSlug === location.pathname;

  return (
    <div
      // This div is for the parent + the children
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

          ...(!depth && {
            display: 'grid',
            alignContent: 'center',
            minHeight: 'var(--height-header-desktop-min)',
            maxHeight: 'var(--height-header-desktop-max)',
            height: 'var(--height-header-desktop-responsive)',
          }),

          ...(hasChildren
            ? {
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              }
            : {
                borderBottomRightRadius: MENU_BORDER_RADIUS,
                borderBottomLeftRadius: MENU_BORDER_RADIUS,
              }),
        }}
      >
        <LinkPreloaderView to={urlfulSlug} style={{ textDecoration: 'none' }}>
          <div
            style={{
              width: 'max-content',
              position: 'relative',
              marginRight: DESKTOP_MENU_ITEM_HORIZONTAL_SPACING,
              marginLeft: `calc(${DESKTOP_MENU_ITEM_HORIZONTAL_SPACING} * ${
                !depth ? 1 : depth
              })`,
            }}
          >
            {isActive && <ActiveIndicatorView depth={depth} />}

            <h4
              style={{
                position: 'relative',

                ...(depth > 0
                  ? {
                      marginTop: MENU_ITEM_VERTICAL_SPACING_DEEP,
                      marginBottom: MENU_ITEM_VERTICAL_SPACING_DEEP,
                    }
                  : {
                      marginTop: '',
                      marginBottom: '',
                    }),
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
        </LinkPreloaderView>
      </div>

      {hovered && hasChildren && (
        <NavDesktopChildItemsView children={child_items} depth={++depth} />
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
