import React from 'react';

/// Class names assigned here need to match with the php counterpart
/// of the classes. This component is styled by scss unlike most
/// others in this project.

const LoaderHtmlView = () => (
  <div className="loader-html__container">
    <LoaderHtmlContentsView />
  </div>
);

export const LoaderHtmlContentsView = () => (
  <div className="loader-html">
    <div>
      <span role="img" aria-label="loading">
        ⏳
      </span>
    </div>
    <h4>Sayfa yükleniyor...</h4>
  </div>
);

export default LoaderHtmlView;
