import React from 'react';
import { FC } from 'react';
import { WpMenuItem } from '../../../@types/wp-types';
import { NavDesktopItemView } from './NavDesktopItem.view';
import { MENU_ITEM_HOVERED_COLOR, MENU_BORDER_RADIUS } from '../../../config';

type NavChildItemsViewProps = {
  children: WpMenuItem[];
  depth: number;
};

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
      paddingTop: depth > 1 ? 0 : 'var(--spacing)',
      paddingBottom: 'var(--spacing)',
      width: depth > 1 ? '100%' : 'auto',
    }}
  >
    {children.map((item) => (
      <NavDesktopItemView {...{ ...item, depth, key: item.ID }} />
    ))}
  </div>
);

export default NavDesktopChildItemsView;
