import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectNav } from '../../../slices/nav/nav.slice';
import NavDesktopItemView from '../nav-desktop-item/NavDesktopItem.view';
import prefetch from '../../../services/prefetch.service';
import { useErrorHandler } from 'react-error-boundary';

const NavDesktopView = () => {
  const handleError = useRef(useErrorHandler());
  const [isLoading, setIsLoading] = useState(false);
  const { items: menu, fetchTime } = useSelector(selectNav);

  useEffect(() => {
    prefetch
      .menu({
        slug: 'nav',
        onFetchStart: () => setIsLoading(true),
        onComplete: () => setIsLoading(false),
      })
      .catch(handleError.current);
  }, []);

  if (isLoading) {
    return null;
  }

  if (menu.length === 0) {
    if (fetchTime !== 0) {
      throw new Error('nav_has_no_items');
    }
    return null;
  }

  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
      }}
    >
      {menu.map((menuItem) => (
        <NavDesktopItemView {...{ ...menuItem, depth: 0, key: menuItem.ID }} />
      ))}
    </nav>
  );
};

export default NavDesktopView;
