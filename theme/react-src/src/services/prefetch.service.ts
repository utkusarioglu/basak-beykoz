import rest from './rest.service';
import { setSingular } from '../slices/singular/singular.slice';
import { setPosts } from '../slices/category-posts/categoryPosts.slice';
import { getState } from '../store';
import { cleanSlug } from '../utils/slug.util';
import { FETCH_STALE_TIME } from '../config';
import { GetWpMenuFail, GetWpMenuSuccess } from '../@types/wp-types';
import { setNav } from '../slices/nav/nav.slice';

export type PrefetcherArgs = {
  /**
   * The slug to prefetch
   */
  slug: string;
  /**
   * Called on complete regardless of whether the content was prefetched
   * or had to be retrieved from the server
   */
  onComplete?: () => void;
  /**
   * Called if the content hasn't been fetched before and the fetch operation
   * is starting
   */
  onFetchStart?: (() => void) | (() => () => void);
  /**
   * Called only if the content hasn't been fetched before and the fetch
   * operation has completed. This one isn't called if the content didn't have
   * to be retrieved from the server
   */
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
    onComplete,
    onFetchStart,
    onFetchComplete,
  }: PrefetcherArgs): Promise<void> {
    const cleanedSlug = cleanSlug(slug);
    let singular = getState().singularRepo[cleanedSlug];

    if (
      singular !== undefined &&
      singular.fetchTime >= Date.now() - FETCH_STALE_TIME
    ) {
      onComplete && onComplete();
      setSingular(singular.data);
      return Promise.resolve();
    }

    const cancelOnFetchStart = onFetchStart && onFetchStart();

    return rest
      .fetchSingular(cleanedSlug)
      .then((data) => {
        if (data.state === 'fail') {
          console.error(data); // ! remove this when the time comes
          throw new Error(data.errorCode);
        }
        setSingular(data.body);
        return;
      })
      .finally(() => {
        onComplete && onComplete();
        onFetchComplete && onFetchComplete();
        cancelOnFetchStart &&
          cancelOnFetchStart instanceof Function &&
          cancelOnFetchStart();
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
    onComplete: onFetchComplete,
  }: PrefetcherArgs): Promise<void> {
    const cleanedSlug = cleanSlug(slug);
    let posts = getState().categoryPosts;

    if (
      posts.slug === cleanedSlug &&
      posts.fetchTime >= Date.now() - FETCH_STALE_TIME
    ) {
      onFetchComplete && onFetchComplete();
      return Promise.resolve();
    }

    const cancelOnFetchStart = onFetchStart && onFetchStart();
    return rest
      .fetchCategoryPosts(cleanedSlug)
      .then((data) => {
        if (data.state === 'fail') {
          console.error(data); // ! remove this when the time comes
          throw new Error(data.errorCode);
        }
        setPosts({
          slug: cleanedSlug,
          items: data.body,
        });
        return;
      })
      .finally(() => {
        onFetchComplete && onFetchComplete();
        cancelOnFetchStart &&
          cancelOnFetchStart instanceof Function &&
          cancelOnFetchStart();
      });
  }

  /**
   * Check whether the state contains nav items. If it doesn't, makes a
   * request to the server, sets the new items in the state
   * @param param0 prefetch arguments
   * @returns void promise
   */
  async menu({
    slug,
    onFetchStart,
    onComplete: onFetchComplete,
  }: PrefetcherArgs): Promise<void> {
    const cleanedSlug = cleanSlug(slug);
    let nav = getState().nav;

    if (nav !== undefined && nav.fetchTime !== 0) {
      onFetchComplete && onFetchComplete();
      setNav({ items: nav.items, slug: 'nav' });
      return;
    }

    const cancelOnFetchStart = onFetchStart && onFetchStart();

    return rest
      .fetchMenu(cleanedSlug)
      .then((data) => {
        if ((data as GetWpMenuFail).code) {
          console.error(data); // ! remove this when the time comes
          throw new Error((data as GetWpMenuFail).code);
        }
        setNav({ items: (data as GetWpMenuSuccess).items, slug: 'nav' });
      })
      .finally(() => {
        onFetchComplete && onFetchComplete();
        cancelOnFetchStart &&
          cancelOnFetchStart instanceof Function &&
          cancelOnFetchStart();
      });
  }
}

export default new Prefetch();
