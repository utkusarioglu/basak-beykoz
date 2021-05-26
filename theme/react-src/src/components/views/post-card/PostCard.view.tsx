import React from 'react';
import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { FC } from 'react';
import type { WrtSingularItem } from '../../../@types/wp-types';
import { LinkPreloaderView } from '../link-preloader/LinkPreloader.view';
import { urlSlug } from '../../../utils/slug.util';
import { useResponsiveWidth } from '../../../utils/responsive.util';

type BlogPostCardViewProps = {
  asSkeleton: boolean;
  opacity?: number;
} & Pick<
  WrtSingularItem,
  'slug' | 'title' | 'date' | 'excerpt' | 'thumbnail' | 'categories'
>;

const DETAILS_PADDING = 'calc(var(--sp) /2 )';
const SKELETON_COLOR =
  'linear-gradient(to right, var(--brush-blue-light), var(--brush-gray-light))';

const asSkeletonProps: CSSProperties = {
  background: SKELETON_COLOR,
  color: 'transparent',
  borderRadius: 'var(--sp)',
};

const BlogPostCardView: FC<BlogPostCardViewProps> = ({
  asSkeleton,
  opacity = 1,
  slug,
  title,
  date,
  excerpt,
  thumbnail,
  categories,
}) => {
  const isW = useResponsiveWidth();
  const [hovered, setHovered] = useState(false);

  return (
    <LinkPreloaderView
      to={urlSlug(slug)}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        className={[
          'has-responsive-vertical-padding-for-blocks',
          'has-responsive-border-radius',
        ].join(' ')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          opacity,
          display: 'grid',
          width: '100%',

          ...(isW.md
            ? {
                gridTemplateAreas: `
                  "thumbnail title"
                  "thumbnail date-and-categories"
                  "thumbnail summary"
                `,
                gridTemplateColumns: '4fr 6fr',
                paddingRight: 'calc(var(--sp) * 2)',
                gridColumnGap: 'calc(var(--sp) * 2)',
              }
            : {
                gridTemplateAreas: `
                  "thumbnail"
                  "title"
                  "date-and-categories"
                  "summary"
                `,
              }),
          gridRowGap: 'var(--sp)',
          marginBottom: 'calc(var(--sp) * 3)',
          backgroundColor: hovered
            ? 'var(--brush-yellow-light)'
            : 'var(--brush-gray-light)',
        }}
      >
        <div
          className="has-responsive-border-radius"
          style={{
            ...(asSkeleton
              ? {
                  background: SKELETON_COLOR,
                }
              : {
                  backgroundImage: `url(${thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }),

            gridArea: 'thumbnail',
            height: isW.md ? '100%' : '40vw',
            width: '100%',
          }}
        />

        <div
          style={{
            gridArea: 'title',
            marginBottom: 'var(--sp)',
            ...(!isW.md && {
              paddingLeft: 'var(--sp)',
              paddingRight: 'var(--sp)',
            }),
          }}
        >
          <h4
            className="has-smaller-fonts"
            style={{
              margin: 0,
              ...(asSkeleton && asSkeletonProps),
            }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>

        <div
          style={{
            gridArea: 'date-and-categories',
            marginTop: `calc(${DETAILS_PADDING} * -2)`,
            ...(!isW.md && {
              paddingLeft: 'var(--sp)',
              paddingRight: 'var(--sp)',
            }),
          }}
        >
          <time
            className="has-smallest-fonts"
            dateTime={date}
            style={{
              backgroundColor: 'var(--brush-blue-light)',
              padding: DETAILS_PADDING,
              borderRadius: DETAILS_PADDING,
              marginRight: DETAILS_PADDING,
              ...(asSkeleton && asSkeletonProps),
            }}
          >
            {date}
          </time>

          {categories.map((category) => (
            <span
              className="has-smallest-fonts"
              key={category}
              style={{
                minWidth: 100,
                backgroundColor: 'var(--brush-green-light)',
                padding: DETAILS_PADDING,
                borderRadius: DETAILS_PADDING,
                marginRight: DETAILS_PADDING,
                ...(asSkeleton && asSkeletonProps),
              }}
            >
              {category}
            </span>
          ))}
        </div>

        <div
          style={{
            gridArea: 'summary',
            margin: 0,

            ...(!isW.md && {
              paddingLeft: 'var(--sp)',
              paddingRight: 'var(--sp)',
            }),
          }}
        >
          <p
            className="has-smaller-fonts"
            style={{
              margin: 0,
              padding: 0,
              minHeight: 50,
              ...(asSkeleton && asSkeletonProps),
            }}
            dangerouslySetInnerHTML={{
              __html: excerpt,
            }}
          />
        </div>
      </div>
    </LinkPreloaderView>
  );
};

export default BlogPostCardView;
