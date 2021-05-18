import type {
  GetSingular,
  GetCategoryPosts,
  GetWpMenus,
  PostContactForm7,
} from '../@types/wp-endpoints';
import { prepareEndpoint } from 'endpoint-tools';
import { REST_TIMEOUT } from '../config';
import { addToSingularRepo } from '../slices/singular-repo/singularRepo.slice';

class Rest {
  /**
   * Handles errors that occur with rest requests
   * @param errorCode errorCode from the server
   */
  private handleError(errorCode: string) {
    return {
      state: 'fail',
      errorCode,
      meta: {
        restTimeout: REST_TIMEOUT,
      },
    };
  }

  /**
   * Introduces a timeout to the promise function given. Uses REST_TIMEOUT
   * config as the timeout time.
   * @param fetchFunc fetch promise function for which to add timeout
   * @returns return of fetch promise or an error object with {state: 'error'}
   * as main prop.
   */
  // TODO remove any types
  private async withTimeout(fetchFunc: Promise<unknown>): Promise<any> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject('rest_timeout');
      }, REST_TIMEOUT);

      fetchFunc
        .then((response) => {
          clearTimeout(timer);
          resolve(response);
        })
        .catch((errorCode) => reject(errorCode));
    }).catch(this.handleError);
  }

  /**
   * Fetches a wp singular from the backend
   * @param slug slug of the singular to be fetched
   * @returns Promise of the singular
   */
  public async fetchSingular(
    slug: string
  ): Promise<GetSingular['_res']['Union']> {
    return this.withTimeout(
      fetch(
        prepareEndpoint<GetSingular>('/wp-json/wrt/v1/singular', {}, { slug })
      )
        .then((response) => response.json())
        .then((data: GetSingular['_res']['Union']) => {
          if (data.state === 'fail') {
            console.error(data); // ! remove this when the time comes
            throw new Error(data.errorCode);
          }
          addToSingularRepo(data.body);
          return data;
        })
    );
  }

  /**
   * Fetches the posts of the category given by the slug
   * @param slug slug of the category from which to fetch the results
   * @returns union object with the posts
   */
  public async fetchCategoryPosts(
    slug: string
  ): Promise<GetCategoryPosts['_res']['Union']> {
    return this.withTimeout(
      fetch(
        prepareEndpoint<GetCategoryPosts>(
          '/wp-json/wrt/v1/category_posts',
          {},
          { slug }
        )
      )
        .then((response) => response.json())
        .then((data: GetCategoryPosts['_res']['Union']) => {
          if (data.state === 'fail') {
            throw new Error(data.errorCode);
          }
          return data;
        })
    );
  }

  /**
   * Fetches the wp menu by its slug
   * @param menuSlug slug for the wp menu
   * @returns fetch union object containing the menu items
   */
  public async fetchMenu(
    menuSlug: string
  ): Promise<GetWpMenus['_res']['Union']> {
    return this.withTimeout(
      fetch(
        prepareEndpoint<GetWpMenus>('/wp-json/menus/v1/menus/:menuSlug', {
          menuSlug,
        })
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.code) {
            throw new Error(data.code);
          }
          return data;
        })
    );
  }

  /**
   * Sends data to the contact form api
   * @param formData form data from the contact form handler
   * @returns server response promise
   */
  public async contactForm(
    formData: FormData
  ): Promise<PostContactForm7['_res']['Union']> {
    return this.withTimeout(
      fetch(
        prepareEndpoint<PostContactForm7>(
          '/wp-json/contact-form-7/v1/contact-forms/135/feedback'
        ),
        {
          method: 'post',
          cache: 'no-cache',
          body: formData,
        }
      ).then((response) => response.json())
    );
  }
}

export default new Rest();
