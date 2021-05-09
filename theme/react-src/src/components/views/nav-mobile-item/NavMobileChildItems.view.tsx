import React from 'react';
import type { FC } from 'react';
import { WpMenuItem } from '../../../@types/wp-types';
import NavMobileItemView from './NavMobileItem.view';

type NavMobileChildItemsViewProps = {
  children: WpMenuItem[];
  depth: number;
};

const NavMobileChildItemsView: FC<NavMobileChildItemsViewProps> = ({
  children,
  depth,
}) => (
  <div
    style={{
      marginTop: 'var(--sp)',
      paddingLeft: `calc(var(--sp) * ${depth} * 2)`,
    }}
  >
    {children.map((item) => (
      <NavMobileItemView {...{ ...item, depth, key: item.ID }} />
    ))}
  </div>
);

export default NavMobileChildItemsView;
