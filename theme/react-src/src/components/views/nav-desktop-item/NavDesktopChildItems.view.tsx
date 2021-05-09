import React from 'react';
import { FC } from 'react';
import { WpMenuItem } from '../../../@types/wp-types';
import { NavDesktopItemView } from './NavDesktopItem.view';
import { MENU_ITEM_HOVERED_COLOR, MENU_BORDER_RADIUS } from '../../../config';

type NavChildItemsViewProps = {
  children: WpMenuItem[];
  depth: number;
};

const MENU_HOVER_HACK_HEIGHT = 200;

const NavDesktopChildItemsView: FC<NavChildItemsViewProps> = ({
  children,
  depth,
}) => (
  <div
    style={{
      position: depth > 1 ? 'relative' : 'absolute',
      backgroundColor: MENU_ITEM_HOVERED_COLOR,
      borderTopRightRadius: MENU_BORDER_RADIUS,
      borderBottomLeftRadius: MENU_BORDER_RADIUS,
      borderBottomRightRadius: MENU_BORDER_RADIUS,
      paddingTop: depth > 1 ? 0 : 'var(--sp)',
      paddingBottom: 'var(--sp)',
      width: depth > 1 ? '100%' : 'auto',
    }}
  >
    {children.map((item) => (
      <NavDesktopItemView {...{ ...item, depth, key: item.ID }} />
    ))}

    {
      /**
       * Creates a transparent div at the end of the depth === 1 menu so that
       * the size fluctuations caused by the children don't end the hover state
       * prematurely. This is a hacky method to increase UX but this will
       * hold for a while.
       */
      depth === 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: -MENU_HOVER_HACK_HEIGHT,
            width: '100%',
            height: MENU_HOVER_HACK_HEIGHT,
            zIndex: 90,
          }}
        />
      )
    }
  </div>
);

export default NavDesktopChildItemsView;
