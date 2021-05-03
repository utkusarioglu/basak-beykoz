import React from 'react';
import { useState, useEffect } from 'react';
import NavItemView from '../nav-item/NavItem.view';
import { useSelector } from 'react-redux';
import { selectNav } from '../../../slices/nav/nav.slice';
import prefetch from '../../../services/prefetch.service';
import LoaderMobileMenu from '../loader-mobile-menu/LoaderMobileMenu.view';

const NavMobileView = () => {
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
      {isLoading ? (
        <LoaderMobileMenu />
      ) : (
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            textAlign: 'right',
          }}
        >
          {menu.length > 0
            ? menu.map((menuItem) => (
                <NavItemView {...{ ...menuItem, depth: 0, key: menuItem.ID }} />
              ))
            : null}
        </nav>
      )}
    </>
  );
};

export default NavMobileView;
