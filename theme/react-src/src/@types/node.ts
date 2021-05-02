declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_UPLOADS_DIR: string;
      REACT_APP_HOME_SLUG: string;
      REACT_APP_BLOG_SLUG: string;
      REACT_APP_REST_ENDPOINT: string;
      REACT_APP_REST_TIMEOUT: string;
      REACT_APP_GOOGLE_ANALYTICS_ID: string;
      REACT_APP_BLOG_POSTS_CATEGORY: string;
      GENERATE_SOURCEMAP: boolean;
    }
  }

  interface Window {
    /**
     * These properties are populated by index.php
     * You can find index.php in react-src/public
     *
     * If you add any new properties to index.php, make sure to set their type
     * here to make sure that their types are casted properly
     */
    config: {
      /** Your wordpress site name */
      pageTitle: string;

      /** Tagline, default is "Just another WordPress site" */
      pageTagline: string;

      /**
       * Separator used in <title>, made available for possible React usage,
       * defaults to "-"
       * */
      titleSeparator: string;
    };
  }
}

export {};
