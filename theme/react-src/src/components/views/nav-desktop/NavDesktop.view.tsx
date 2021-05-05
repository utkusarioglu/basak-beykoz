import React from 'react';
import { useState, useEffect } from 'react';
import type { WpMenuItem, GetWpMenuSuccess } from '../../../@types/wp-types';
import rest from '../../../services/rest.service';
import NavDesktopItemView from '../nav-desktop-item/NavDesktopItem.view';

const NavDesktopView = () => {
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
        alignItems: 'center',
      }}
    >
      {menu.length > 0
        ? menu.map((menuItem) => (
            <NavDesktopItemView
              {...{ ...menuItem, depth: 0, key: menuItem.ID }}
            />
          ))
        : null}
    </nav>
  );
};

export default NavDesktopView;
