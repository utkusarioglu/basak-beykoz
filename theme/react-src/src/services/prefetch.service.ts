import rest from './rest.service';
import { setSingular } from '../slices/singular/singular.slice';
import { setPosts } from '../slices/category-posts/categoryPosts.slice';
import { getState } from '../store';
import { cleanSlug } from '../utils/slug.util';
import { FETCH_STALE_TIME } from '../config';

export type PrefetcherArgs = {
  slug: string;
  onFetchStart?: () => void;
  onFetchComplete?: () => void;
};

class Prefetch {
  /**
   * Checks if the store.singularRepo contains the slug requested and whether
   * the post is not stale. If so, then stored post is returned. Otherwise, the
   * post is requested from the server and then placed in the store.
   * @param slug slug for the post requested
   * @returns resolved or rejected promise
   */
  async singular({
    slug,
    onFetchStart,
    onFetchComplete,
  }: PrefetcherArgs): Promise<void> {
    const cleanedSlug = cleanSlug(slug);
    let singular = getState().singularRepo[cleanedSlug];

    return new Promise<void>((resolve, reject) => {
      if (
        singular === undefined ||
        singular.fetchTime < Date.now() - FETCH_STALE_TIME
      ) {
        onFetchStart && onFetchStart();
        rest.fetchSingular(cleanedSlug).then((data) => {
          onFetchComplete && onFetchComplete();
          if (data.state === 'fail') {
            console.error(data);
            reject();
            return;
          }
          setSingular(data.body);
          resolve();
        });
      } else {
        setSingular(singular.data);
        resolve();
      }
    });
  }

  /**
   * Checks whether the store contains the category posts requested and whether
   * they are stale. If not, then the method issues a request to the server
   * for new category posts and places them in the store before fulfilling
   * the promise.
   * @param slug slug for which to check the posts of a category
   * @returns resolved or rejected promise
   */
  async categoryPosts({
    slug,
    onFetchStart,
    onFetchComplete,
  }: PrefetcherArgs): Promise<void> {
    const cleanedSlug = cleanSlug(slug);
    let posts = getState().categoryPosts;
    return new Promise<void>((resolve, reject) => {
      if (
        posts.slug !== cleanedSlug ||
        posts.fetchTime < Date.now() - FETCH_STALE_TIME
      ) {
        onFetchStart && onFetchStart();
        rest.fetchCategoryPosts(cleanedSlug).then((data) => {
          onFetchComplete && onFetchComplete();
          if (data.state === 'fail') {
            if (data.state === 'fail') {
              console.error(data);
              reject();
              return;
            }
          } else {
            setPosts({
              slug: cleanedSlug,
              items: data.body,
            });
            resolve();
            return data.body;
          }
        });
      } else {
        resolve();
        return posts.items;
      }
    });
  }
}

export default new Prefetch();
