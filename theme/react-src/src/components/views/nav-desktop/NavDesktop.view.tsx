import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectNav } from '../../../slices/nav/nav.slice';
import NavDesktopItemView from '../nav-desktop-item/NavDesktopItem.view';
import prefetch from '../../../services/prefetch.service';

const NavDesktopView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { items: menu } = useSelector(selectNav);

  useEffect(() => {
    prefetch.menu({
      slug: 'nav',
      onFetchStart: () => setIsLoading(true),
      onFetchComplete: () => setIsLoading(false),
    });
  }, []);

  return (
    <>
      {isLoading ? null : (
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
      )}
    </>
  );
};

export default NavDesktopView;
