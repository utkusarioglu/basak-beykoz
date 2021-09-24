import React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectNav } from '../../../slices/nav/nav.slice';
import prefetch from '../../../services/prefetch.service';
import LoaderMobileMenu from '../loader-mobile-menu/LoaderMobileMenu.view';
import NavMobileItemView from '../nav-mobile-item/NavMobileItem.view';
import SocialMobileView from '../social-mobile/SocialMobile.view';
import MobileMenuSectionTitleView from '../mobile-menu-section-title/MobileMenuSectionTitleViewProps';
import { useErrorHandler } from 'react-error-boundary';

const NavMobileView = () => {
  const handleError = useRef(useErrorHandler());
  const { items: menu, fetchTime } = useSelector(selectNav);

  useEffect(() => {
    prefetch.menu({ slug: 'nav' }).catch(handleError.current);
  }, []);

  if (fetchTime === 0) {
    return <LoaderMobileMenu />;
  }

  if (menu.length === 0 && fetchTime !== 0) {
    return <p>There is nothing in this menu</p>;
  }

  return (
    <div
      style={{
        /**
         * paddingTop is created by the default padding of the first
         * menu item. Setting a paddingTop statement over here may go
         * overboard with the spacing
         * */
        paddingBottom: 'calc(var(--sp) * 2)',
      }}
    >
      {/* <MobileMenuSectionTitleView>Sayfalar</MobileMenuSectionTitleView> */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {menu.map((menuItem) => (
          <NavMobileItemView {...{ ...menuItem, depth: 0, key: menuItem.ID }} />
        ))}
      </nav>

      <MobileMenuSectionTitleView>Sosyal Medya</MobileMenuSectionTitleView>
      <SocialMobileView />
    </div>
  );
};

export default NavMobileView;
