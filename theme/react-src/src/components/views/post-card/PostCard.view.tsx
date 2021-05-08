import React, { CSSProperties } from 'react';
import type { FC } from 'react';
import type { WrtSingularItem } from '../../../@types/wp-types';
import { LinkPreloaderSingularView } from '../link-preloader/LinkPreloader.view';
import { urlSlug } from '../../../utils/slug.util';
import { useMediaQuery } from 'react-responsive';
import { DESKTOP_MIN_WIDTH } from '../../../config';

type BlogPostCardViewProps = {
  asSkeleton: boolean;
  opacity?: number;
} & Pick<
  WrtSingularItem,
  'slug' | 'title' | 'date' | 'excerpt' | 'thumbnail' | 'categories'
>;

const DETAILS_PADDING = 'calc(var(--spacing) /2 )';
const SKELETON_COLOR =
  'linear-gradient(to right, var(--brush-lightBlue), var(--brush-lightGray))';

const asSkeletonProps: CSSProperties = {
  background: SKELETON_COLOR,
  color: 'transparent',
  borderRadius: 'var(--spacing)',
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
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });

  return (
    <LinkPreloaderSingularView to={urlSlug(slug)}>
      <div
        style={{
          opacity,
          display: 'grid',
          ...(isDesktop
            ? {
                gridTemplateAreas: `
                    "thumbnail title"
                    "thumbnail date-and-categories"
                    "thumbnail summary"
                  `,
                gridTemplateColumns: '4fr 6fr',
                paddingRight: 'calc(var(--spacing) * 2)',
                gridColumnGap: 'calc(var(--spacing) * 2)',
              }
            : {
                gridTemplateAreas: `
                    "thumbnail"
                    "title"
                    "date-and-categories"
                    "summary"
                  `,
              }),
          gridRowGap: 'var(--spacing)',
          paddingTop: 'var(--spacing)',
          paddingBottom: 'var(--spacing)',
          marginBottom: 'calc(var(--spacing) * 3)',
          borderRadius: 'var(--spacing)',
          backgroundColor: 'var(--brush-lightGray)',
        }}
      >
        <div
          style={{
            gridArea: 'thumbnail',
            height: isDesktop ? '100%' : '40vw',
            width: '100%',
            borderRadius: 'var(--spacing)',
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
          }}
        />

        <div
          style={{
            gridArea: 'title',
            marginBottom: 'var(--spacing)',
            ...(!isDesktop && {
              paddingLeft: 'var(--spacing)',
              paddingRight: 'var(--spacing)',
            }),
          }}
        >
          <h4
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
            ...(!isDesktop && {
              paddingLeft: 'var(--spacing)',
              paddingRight: 'var(--spacing)',
            }),
          }}
        >
          <time
            dateTime={date}
            style={{
              fontSize: '0.7em',
              backgroundColor: 'var(--brush-lightBlue)',
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
              key={category}
              style={{
                minWidth: 100,
                fontSize: '0.7em',
                backgroundColor: 'var(--brush-lightYellow)',
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
            ...(!isDesktop && {
              paddingLeft: 'var(--spacing)',
              paddingRight: 'var(--spacing)',
            }),
            margin: 0,
          }}
        >
          <p
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
    </LinkPreloaderSingularView>
  );
};

export default BlogPostCardView;
