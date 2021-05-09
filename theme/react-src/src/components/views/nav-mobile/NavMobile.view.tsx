import React from 'react';
import { useState, useEffect, useRef } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const { items: menu } = useSelector(selectNav);

  useEffect(() => {
    prefetch
      .menu({
        slug: 'nav',
        onFetchStart: () => setIsLoading(true),
        onFetchComplete: () => setIsLoading(false),
      })
      .catch(handleError.current);
  }, []);

  if (isLoading) {
    return <LoaderMobileMenu />;
  }

  return (
    <div
      style={{
        marginTop: 'calc(var(--spacing) * 2)',
        marginBottom: 'calc(var(--spacing) * 2)',
      }}
    >
      <MobileMenuSectionTitleView>Sayfalar</MobileMenuSectionTitleView>
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
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

      <MobileMenuSectionTitleView>Sosyal Medya</MobileMenuSectionTitleView>
      <SocialMobileView />
    </div>
  );
};

export default NavMobileView;
