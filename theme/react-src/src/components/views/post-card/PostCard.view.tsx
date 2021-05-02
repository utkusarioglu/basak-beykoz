import React from 'react';
import type { FC } from 'react';
import type { WrtSingularItem } from '../../../@types/wp-types';
import PreloaderLink from '../preloader-link/PreloaderLink.view';
import { lazyWithPreload } from '../../../utils/lazyWithPreload.util';
import prefetch from '../../../services/prefetch.service';

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

const BlogPostCardView: FC<BlogPostCardViewProps> = (props) => {
  if (props.asSkeleton === true) {
    return (
      <div style={{ opacity: props.opacity }}>Loading...{props.opacity}</div>
    );
  } else {
    return (
      <PreloaderLink
        to={`/${props.item.slug}`}
        component={lazyWithPreload(
          () => import('../../routes/singular/Singular.route')
        )}
        prefetch={() => prefetch.singular(props.item.slug)}
      >
        <div>
          <div
            style={{
              height: 100,
              width: 100,
              backgroundImage: `url(${props.item.thumbnail})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          ></div>
          <h4 dangerouslySetInnerHTML={{ __html: props.item.title }}></h4>
        </div>
      </PreloaderLink>
    );
  }
};

export default BlogPostCardView;
