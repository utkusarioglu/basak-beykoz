import React from 'react';

const LoaderHtmlView = () => (
  <div className="cat-loading-container">
    <LoaderHtmlContentsView />
  </div>
);

export const LoaderHtmlContentsView = () => (
  <div className="cat-loading">
    <div>
      <span role="img" aria-label="loading">
        😺
      </span>
    </div>
    <h4>Kedi sayfayı yüklüyor...</h4>
  </div>
);

export default LoaderHtmlView;
