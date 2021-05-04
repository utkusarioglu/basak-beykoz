import React from 'react';
import { FC } from 'react';
import { WpMenuItem } from '../../../@types/wp-types';
import { urlSlug } from '../../../utils/slug.util';
import NavMobileChildItemsView from './NavMobileChildItems.view';
import { LinkNavView } from '../link-nav/LinkNav.view';
import { MOBILE_MENU_PADDING } from '../../../config';

type NavMobileItemViewProps = WpMenuItem & { depth: number };

const NavMobileItemView: FC<NavMobileItemViewProps> = ({
  title,
  slug,
  child_items,
  depth,
}) => {
  const urlfulSlug = urlSlug(slug);

  return (
    <div
      style={{
        marginTop: 'var(--spacing)',
      }}
    >
      <LinkNavView urlfulSlug={urlfulSlug}>
        <div
          style={{
            marginLeft: MOBILE_MENU_PADDING.horizontal,
            marginRight: MOBILE_MENU_PADDING.horizontal,
            paddingTop: MOBILE_MENU_PADDING.vertical,
            paddingBottom: MOBILE_MENU_PADDING.vertical,
          }}
        >
          {title}
        </div>
      </LinkNavView>

      {child_items && child_items.length > 0 && (
        <NavMobileChildItemsView children={child_items} depth={depth + 1} />
      )}
    </div>
  );
};

export default NavMobileItemView;
