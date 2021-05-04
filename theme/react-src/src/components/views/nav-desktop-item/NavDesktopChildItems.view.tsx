import React from 'react';
import { FC } from 'react';
import { WpMenuItem } from '../../../@types/wp-types';
import { NavDesktopItemView } from './NavDesktopItem.view';

type NavChildItemsViewProps = {
  children: WpMenuItem[];
  depth: number;
};
export const NavDesktopChildItemsView: FC<NavChildItemsViewProps> = ({
  children,
  depth,
}) => (
  <div
    style={{
      position: 'absolute',
    }}
  >
    {children.map((item) => (
      <NavDesktopItemView {...{ ...item, depth, key: item.ID }} />
    ))}
  </div>
);
