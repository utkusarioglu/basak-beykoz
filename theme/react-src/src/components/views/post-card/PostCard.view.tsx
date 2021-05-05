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
        <div
          style={{
            paddingTop: 'var(--spacing)',
            paddingBottom: 'var(--spacing)',
            marginBottom: 'calc(var(--spacing) * 3)',
            borderRadius: 'var(--spacing)',
            backgroundColor: 'var(--brush-lightGray)',
          }}
        >
          <div
            style={{
              height: '40vw',
              width: '100%',
              backgroundImage: `url(${props.item.thumbnail})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderRadius: 'var(--spacing)',
            }}
          />
          <div
            style={{
              paddingLeft: 'var(--spacing)',
              paddingRight: 'var(--spacing)',
            }}
          >
            <h4
              dangerouslySetInnerHTML={{ __html: props.item.title }}
              style={{
                marginTop: 'var(--spacing)',
                marginBottom: 'var(--spacing)',
              }}
            />
            <summary
              dangerouslySetInnerHTML={{
                __html:
                  props.item.excerpt ||
                  props.item.content.split('.')[0].replace('<p>', '') + '.',
              }}
            />
            {/* <div
              style={{
                display: 'grid',
                alignContent: 'end',
                gridColumnGap: 'var(--spacing)',
                gridAutoFlow: 'column',
              }}
            >
              <button style={buttonStyles}>Paylaş</button>
              <button style={buttonStyles}>Devamını gör eyle</button>
            </div> */}
          </div>
        </div>
      </SingularPreloaderLinkView>
    );
  }
};

export default BlogPostCardView;
