import React from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { WpMenuItem } from '../../../@types/wp-types';
import { urlSlug } from '../../../utils/slug.util';
import { NavDesktopChildItemsView } from './NavDesktopChildItems.view';
import { LinkNavView } from '../link-nav/LinkNav.view';

type NavDesktopItemViewProps = WpMenuItem & { depth: number };

export const NavDesktopItemView: FC<NavDesktopItemViewProps> = ({
  title,
  slug,
  child_items,
  depth,
}) => {
  const [hovered, setHovered] = useState(false);
  const urlfulSlug = urlSlug(slug);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <LinkNavView urlfulSlug={urlfulSlug}>
        <div
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        >
          {title}
        </div>
      </LinkNavView>

      {hovered && child_items && child_items.length > 0 && (
        <NavDesktopChildItemsView children={child_items} depth={depth} />
      )}
    </div>
  );
};

export default NavDesktopItemView;
