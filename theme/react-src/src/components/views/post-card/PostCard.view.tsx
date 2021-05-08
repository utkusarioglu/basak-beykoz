import React from 'react';
import type { FC } from 'react';
import type { WrtSingularItem } from '../../../@types/wp-types';
import { LinkPreloaderSingularView } from '../link-preloader/LinkPreloader.view';
import { urlSlug } from '../../../utils/slug.util';
import { useMediaQuery } from 'react-responsive';
import { DESKTOP_MIN_WIDTH } from '../../../config';

type PostCardSkeletonProps = {
  asSkeleton: true;
  opacity: number;
};

type BlogPostCardViewProps =
  | {
      asSkeleton: false;
      item: WrtSingularItem;
    }
  | PostCardSkeletonProps;

const dateFormat = new Intl.DateTimeFormat('TR-TR');

const DETAILS_PADDING = 'calc(var(--spacing) /2 )';

const BlogPostCardView: FC<BlogPostCardViewProps> = (props) => {
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });

  if (props.asSkeleton === true) {
    return (
      <div style={{ opacity: props.opacity }}>Loading...{props.opacity}</div>
    );
  }

  const { slug, title, date, excerpt, thumbnail, categories } = props.item;

  return (
    <LinkPreloaderSingularView to={urlSlug(slug)}>
      <div
        style={{
          display: 'grid',
          ...(isDesktop
            ? {
                gridTemplateAreas: `
                    "thumbnail title"
                    "thumbnail date-and-categories"
                    "thumbnail summary"
                  `,
                gridTemplateColumns: '4fr 6fr',
                gridTemplateRows: '4fr', // ! this doesn't work for setting square thumbnails
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
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: 'var(--spacing)',
          }}
        />
        <h4
          style={{
            gridArea: 'title',
            marginTop: isDesktop ? 0 : 'var(--spacing)',
            marginBottom: 'var(--spacing)',
            ...(!isDesktop && {
              paddingLeft: 'var(--spacing)',
              paddingRight: 'var(--spacing)',
            }),
          }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          style={{
            gridArea: 'date-and-categories',
            marginTop: `calc(${DETAILS_PADDING} * -2)`,
            ...(isDesktop
              ? {
                  // marginLeft: `calc(${DETAILS_PADDING} * -1)`,
                }
              : {
                  paddingLeft: 'var(--spacing)',
                  paddingRight: 'var(--spacing)',
                }),
          }}
        >
          <time
            dateTime={date}
            style={{
              // gridArea: 'date',
              fontSize: '0.7em',
              backgroundColor: 'var(--brush-lightBlue)',
              padding: DETAILS_PADDING,
              borderRadius: DETAILS_PADDING,
              marginRight: DETAILS_PADDING,
            }}
          >
            {dateFormat.format(new Date(date))}
          </time>

          {categories.map((category) => (
            <span
              key={category}
              style={{
                fontSize: '0.7em',
                backgroundColor: 'var(--brush-lightYellow)',
                padding: DETAILS_PADDING,
                borderRadius: DETAILS_PADDING,
                marginRight: DETAILS_PADDING,
              }}
            >
              {category}
            </span>
          ))}
        </div>

        <p
          style={{
            gridArea: 'summary',
            margin: 0,
            ...(!isDesktop && {
              paddingLeft: 'var(--spacing)',
              paddingRight: 'var(--spacing)',
            }),
          }}
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
        />
      </div>
    </LinkPreloaderSingularView>
  );
};

export default BlogPostCardView;
