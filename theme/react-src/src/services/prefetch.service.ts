import rest from './rest.service';
import { setSingular } from '../slices/singular/singular.slice';
import { setPosts } from '../slices/category-posts/categoryPosts.slice';
import { getState } from '../store';
import { cleanSlug } from '../utils/slug.util';
import { FETCH_STALE_TIME } from '../config';

class Prefetch {
  /**
   * Checks if the store.singularRepo contains the slug requested and whether
   * the post is not stale. If so, then stored post is returned. Otherwise, the
   * post is requested from the server and then placed in the store.
   * @param rawSlug slug for the post requested
   * @returns resolved or rejected promise
   */
  async singular(rawSlug: string): Promise<void> {
    const cleanedSlug = cleanSlug(rawSlug);
    let singular = getState().singularRepo[cleanedSlug];

    return new Promise<void>((resolve, reject) => {
      if (
        singular === undefined ||
        singular.fetchTime < Date.now() - FETCH_STALE_TIME
      ) {
        rest.fetchSingular(cleanedSlug).then((data) => {
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
   * @param rawSlug slug for which to check the posts of a category
   * @returns resolved or rejected promise
   */
  async categoryPosts(rawSlug: string): Promise<void> {
    const cleanedSlug = cleanSlug(rawSlug);
    let posts = getState().categoryPosts;
    return new Promise<void>((resolve, reject) => {
      if (
        posts.slug !== cleanedSlug ||
        posts.fetchTime < Date.now() - FETCH_STALE_TIME
      ) {
        rest.fetchCategoryPosts(cleanedSlug).then((data) => {
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
          }
        });
      } else {
        resolve();
      }
    });
  }
}

export default new Prefetch();
