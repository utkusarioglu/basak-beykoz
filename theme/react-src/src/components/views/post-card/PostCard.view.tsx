import React from 'react';
import type { FC } from 'react';
import type { WrtSingularItem } from '../../../@types/wp-types';
import { SingularPreloaderLinkView } from '../preloader-link/PreloaderLink.view';
import { urlSlug } from '../../../utils/slug.util';

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
      <SingularPreloaderLinkView to={urlSlug(props.item.slug)}>
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
      </SingularPreloaderLinkView>
    );
  }
};

export default BlogPostCardView;
