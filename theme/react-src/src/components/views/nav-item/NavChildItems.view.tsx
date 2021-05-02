import React from 'react';
import { FC } from 'react';
import { WpMenuItem } from '../../../@types/wp-types';
import { NavItemView } from './NavItem.view';

type NavChildItemsViewProps = {
  children: WpMenuItem[];
  depth: number;
};
export const NavChildItemsView: FC<NavChildItemsViewProps> = ({
  children,
  depth,
}) => (
  <div
    style={{
      position: 'absolute',
    }}
  >
    {children.map((item) => (
      <NavItemView {...{ ...item, depth, key: item.ID }} />
    ))}
  </div>
);
