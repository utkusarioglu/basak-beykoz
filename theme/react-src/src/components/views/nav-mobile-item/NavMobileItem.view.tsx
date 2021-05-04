import React from 'react';
import { FC } from 'react';
import { WpMenuItem } from '../../../@types/wp-types';
import { urlSlug } from '../../../utils/slug.util';
import NavMobileChildItemsView from './NavMobileChildItems.view';
import { LinkNavView } from '../link-nav/LinkNav.view';

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
            marginLeft: 8,
            marginRight: 8,
            paddingTop: 4,
            paddingBottom: 4,
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
