import React from 'react';
import { useState, useEffect } from 'react';
// import NavDesktopItemView from '../nav-desktop-item/NavDesktopItem.view';
import { useSelector } from 'react-redux';
import { selectNav } from '../../../slices/nav/nav.slice';
import prefetch from '../../../services/prefetch.service';
import LoaderMobileMenu from '../loader-mobile-menu/LoaderMobileMenu.view';
import NavMobileItemView from '../nav-mobile-item/NavMobileItem.view';
import SocialMobileView from '../social-mobile/SocialMobile.view';

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
        <>
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              // textAlign: 'right',
            }}
          >
            {menu.length > 0
              ? menu.map((menuItem) => (
                  <NavMobileItemView
                    {...{ ...menuItem, depth: 0, key: menuItem.ID }}
                  />
                ))
              : null}
          </nav>
          <SocialMobileView />
        </>
      )}
    </>
  );
};

export default NavMobileView;
