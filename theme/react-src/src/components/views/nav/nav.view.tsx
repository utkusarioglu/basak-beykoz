import React from 'react';
import { useState, useEffect } from 'react';
import type { WpMenuItem, GetWpMenuSuccess } from '../../../@types/wp-types';
import rest from '../../../services/rest.service';
import NavItemView from '../nav-item/NavItem.view';

const NavView = () => {
  const [menu, setMenu] = useState<WpMenuItem[]>([]);

  useEffect(() => {
    rest.fetchMenu('nav').then((data) => {
      if (data.hasOwnProperty('code')) {
        setMenu([]);
      } else {
        setMenu((data as GetWpMenuSuccess).items);
      }
    });
  }, []);

  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
      }}
    >
      {menu.length > 0
        ? menu.map((menuItem) => (
            <NavItemView {...{ ...menuItem, depth: 0, key: menuItem.ID }} />
          ))
        : null}
    </nav>
  );
};

export default NavView;
