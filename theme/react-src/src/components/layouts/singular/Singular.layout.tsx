import React from 'react';
import type { FC } from 'react';
import SingularView from '../../views/singular/Singular.view';
import CategoryPostsFeedView from '../../views/category-posts-feed/CategoryPostsFeed.view';
import type { SingularSliceRenderEnabled } from '../../../slices/singular/singular.slice.types';
import StandardLayout from '../standard/Standard.layout';
import { HOME_SLUG } from '../../../config';

interface SingularLayoutProps {
  singular: SingularSliceRenderEnabled;
}

const SingularLayout: FC<SingularLayoutProps> = ({ singular }) => {
  return (
    <StandardLayout
      title={singular.title}
      hideThumbnail={hideThumbnail(singular.slug)}
      thumbnailUrl={singular.thumbnail}
      hideTitle={hideTitle(singular.slug)}
      hideMargins={hideMargins(singular.slug)}
      hideFooterShim={hideFooterShim(singular.slug)}
    >
      <SingularView {...singular} />

      {singular.type === 'post' && (
        <div
          style={{
            marginTop: '10vh',
          }}
        >
          <h3>
            Daha fazlası{' '}
            <span role="img" aria-label="love">
              💙
            </span>
          </h3>
          <CategoryPostsFeedView
            categorySlug={singular.categories.join(',')}
            excludePostSlug={singular.slug}
          />
        </div>
      )}
    </StandardLayout>
  );
};

/**
 * Checks if the given slug is listed to have its title hidden
 * @param slug page slug for which to decide whether to hide the title
 * @returns boolean - true to hide
 */
function hideTitle(slug: string) {
  switch (slug) {
    case HOME_SLUG:
    case 'restart':
      return true;

    default:
      return false;
  }
}

/**
 * Checks if the given slug is listed to have its thumbnail section hidden
 * @param slug page slug for which to decide whether to hide the thumbnail
 * @returns boolean - true to hide
 */
function hideThumbnail(slug: string) {
  switch (slug) {
    case HOME_SLUG:
      return true;

    default:
      return false;
  }
}

/**
 * Hides margins for the page slugs given below
 *
 * @remarks
 * Normally the layout includes some vertical margins for the entire page
 * However, it's possible that some pages need more granular control over
 * their margins, such as the home page. In this case, it's possible
 * to enlist the slug of the page here to ensure that the layout doesn't
 * introduce any margins
 *
 * @param slug page slug for which to decide whether to hide the margins
 * @returns boolean - true to hide
 */
function hideMargins(slug: string) {
  switch (slug) {
    case HOME_SLUG:
      return true;

    default:
      return false;
  }
}

/**
 * Hides the footer shim for the listed pages
 *
 * @remarks
 * Footer has transparent sections, for this reason, the footer is placed
 * inside the bottom padding of the page content. On pages where there are
 * multiple colors for the page sections, it's possible that the layout padding
 * introduced here may not match the color of the last section of the page.
 *
 * In those cases, you can disable the footer shim for that slug here and then
 * introduce it through css or component settings to ensure that the footer is
 * placed over the padding of the correct component, ensuring the right
 * background colors are shown.
 *
 * @param slug page slug for which to decide whether to hide the footer shim
 * @returns boolean - true to hide
 */
function hideFooterShim(slug: string) {
  switch (slug) {
    case HOME_SLUG:
      return true;
    default:
      return false;
  }
}

export default SingularLayout;
